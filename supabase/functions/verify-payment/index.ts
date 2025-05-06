
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0";
import { createHmac } from "https://deno.land/std@0.168.0/crypto/mod.ts";

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
    const { paymentId, orderId, signature, courseId } = await req.json();
    
    if (!paymentId || !orderId || !signature || !courseId) {
      throw new Error("Missing payment verification parameters");
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
      throw new Error("User not authenticated");
    }

    // Get course details
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .single();
    
    if (courseError || !course) {
      throw new Error("Course not found");
    }

    // Verify payment signature
    const razorpaySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!razorpaySecret) {
      throw new Error("Razorpay secret key not configured");
    }

    const payload = orderId + "|" + paymentId;
    const hmac = createHmac("sha256", razorpaySecret);
    const digest = hmac.update(payload).digest("hex");
    
    if (digest !== signature) {
      throw new Error("Invalid payment signature");
    }

    // Record enrollment in database
    const amount = course.discounted_price || course.price;
    
    const { data: enrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .insert({
        user_id: user.id,
        course_id: courseId,
        payment_id: paymentId,
        order_id: orderId,
        amount: amount,
        status: "completed"
      })
      .select()
      .single();

    if (enrollmentError) {
      // If error is due to unique constraint (already enrolled)
      if (enrollmentError.message.includes('duplicate key value violates unique constraint')) {
        // Just return success as they are already enrolled
        return new Response(
          JSON.stringify({ success: true, message: "Already enrolled in this course" }),
          { 
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200 
          }
        );
      }
      throw new Error(`Enrollment error: ${enrollmentError.message}`);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        enrollment: enrollment 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400 
      }
    );
  }
});
