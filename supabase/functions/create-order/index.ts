
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Create order function called");
    
    // Get request data
    const { courseId, amount } = await req.json();
    
    console.log(`Request data: courseId = ${courseId}, amount = ${amount}`);
    
    if (!courseId || !amount) {
      throw new Error("Course ID and amount are required");
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get auth user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      console.error("Authentication error:", userError);
      throw new Error("User not authenticated");
    }

    console.log(`Authenticated user: ${user.id}`);

    // Get course details for verification
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .single();
    
    if (courseError || !course) {
      console.error("Course error:", courseError);
      throw new Error("Course not found");
    }
    
    console.log(`Found course: ${course.title}`);

    // Verify amount matches course price
    const coursePrice = course.discounted_price || course.price;
    if (parseFloat(amount) !== parseFloat(coursePrice.toString())) {
      console.error(`Amount mismatch: expected ${coursePrice}, got ${amount}`);
      throw new Error("Amount mismatch");
    }

    // Create Razorpay order
    const razorpayKey = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpaySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    
    if (!razorpayKey || !razorpaySecret) {
      console.error("Razorpay keys not configured");
      throw new Error("Razorpay keys not configured");
    }

    console.log("Creating Razorpay order");

    const auth = btoa(`${razorpayKey}:${razorpaySecret}`);
    
    const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: Math.round(parseFloat(amount) * 100), // Amount in paise
        currency: "INR",
        receipt: `course_${courseId}_${user.id}`,
      })
    });

    const responseText = await orderResponse.text();
    console.log(`Razorpay API response status: ${orderResponse.status}`);
    console.log(`Razorpay API response: ${responseText}`);

    if (!orderResponse.ok) {
      throw new Error(`Razorpay error: Status ${orderResponse.status}, Response: ${responseText}`);
    }

    const orderData = JSON.parse(responseText);
    
    return new Response(
      JSON.stringify({
        order: orderData,
        key: razorpayKey,
        course: course,
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error in create-order function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400 
      }
    );
  }
});
