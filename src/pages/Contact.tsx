import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SmsPopup from "@/components/SmsPopup";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [smsOpen, setSmsOpen] = useState(false);
  // Removed: showConfirmation, error

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    // Optionally, trigger any backend process here
    // For now, only show the SMS dialog after submit

    setIsSubmitting(false);

    // Show the SMS popup
    setSmsOpen(true);

    // Optionally clear the form
    form.reset();
  };

  return (
    <>
      <NavBar />
      <main className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Raise a Ticket</h1>
            <p className="mt-4 text-xl text-gray-600">
              Have a question or need support? Fill out the form below.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Inquiry about..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message / Ticket Details</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Please describe your issue or query here..." rows={6} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full bg-royal hover:bg-royal-dark text-lg py-3">
                  {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <SmsPopup open={smsOpen} onOpenChange={setSmsOpen} />
      <Footer />
    </>
  );
};

export default ContactPage;
