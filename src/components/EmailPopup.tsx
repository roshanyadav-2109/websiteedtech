
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, X } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const EmailPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openContactForm', handleOpen);
    return () => {
      window.removeEventListener('openContactForm', handleOpen);
    };
  }, []);

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
    setShowConfirmation(false);
    setError(null);
    
    const { error } = await supabase.functions.invoke('contact-us', {
      body: values,
    });

    setIsSubmitting(false);

    if (error) {
      setError('There was an error submitting the form. Please try again.');
      console.error("Error invoking function:", error);
    } else {
      setShowConfirmation(true);
      form.reset();
      setTimeout(() => {
        setShowConfirmation(false);
        setIsOpen(false);
      }, 3000);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {!isOpen && (
        <div className="bg-golden text-black py-2 px-4 rounded-lg shadow-lg text-sm animate-fade-in">
          Have queries? Raise a ticket!
        </div>
      )}
      <div 
        className="bg-royal text-white w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-royal-dark transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Mail size={24} />}
      </div>
      {isOpen && (
        <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center">Contact Us</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your message here..." rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </Form>
          {showConfirmation && (
            <div className="bg-green-100 text-green-800 p-3 rounded-lg mt-4 text-center">
              Thank you! Your message has been sent.
            </div>
          )}
          {error && (
             <div className="bg-red-100 text-red-800 p-3 rounded-lg mt-4 text-center">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailPopup;
