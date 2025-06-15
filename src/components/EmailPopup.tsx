
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Mail, X } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const EmailPopup = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("openContactForm", handleOpen);
    return () => {
      window.removeEventListener("openContactForm", handleOpen);
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
    const { error } = await supabase.functions.invoke("contact-us", {
      body: values,
    });
    setIsSubmitting(false);

    if (error) {
      setError("There was an error submitting the form. Please try again.");
    } else {
      setShowConfirmation(true);
      form.reset();
      setTimeout(() => {
        setShowConfirmation(false);
        setOpen(false);
      }, 2200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Floating trigger button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {!open && (
          <div className="bg-golden text-black py-2 px-4 rounded-lg shadow-lg text-sm animate-fade-in font-semibold">
            Have queries? Raise a ticket!
          </div>
        )}
        <DialogTrigger asChild>
          <button
            className={
              "bg-royal text-white w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-royal-dark transition-colors outline-none border-4 border-white"
            }
            aria-label={open ? "Close Contact Form" : "Open Contact Form"}
          >
            {open ? <X size={28} /> : <Mail size={28} />}
          </button>
        </DialogTrigger>
      </div>
      <DialogContent className="max-w-md p-0 rounded-2xl overflow-hidden animate-scale-in border-0 shadow-premium">
        <DialogHeader className="relative">
          {/* Gradient header with icon and close button */}
          <div className="bg-gradient-to-r from-royal to-royal-dark py-6 px-6 flex flex-col items-center relative">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow scale-110 -mt-4 mb-1 border-4 border-golden">
              <Mail className="text-royal" size={30} />
            </div>
            <DialogTitle className="text-2xl font-bold text-white mt-2 mb-1">
              Contact Us
            </DialogTitle>
            <DialogDescription className="text-white/90 text-base font-medium pb-2">
              We'd love to hear from you. Fill out the form below and our team will respond soon!
            </DialogDescription>
            <DialogClose className="absolute right-2 top-2 rounded-full p-1 hover:bg-royal-light focus:outline-none">
              <X className="text-white" size={22} />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="bg-white px-6 py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Your Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="bg-gray-50 focus:bg-white"
                        {...field}
                      />
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
                    <FormLabel className="text-gray-700">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Inquiry about..."
                        className="bg-gray-50 focus:bg-white"
                        {...field}
                      />
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
                    <FormLabel className="text-gray-700">Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here..."
                        rows={4}
                        className="bg-gray-50 focus:bg-white resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Feedback messages */}
              {showConfirmation ? (
                <div className="bg-green-50 text-green-700 font-medium px-3 py-2 rounded w-full text-center animate-fade-in">
                  🎉 Thank you! Your message has been sent.
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 font-medium px-3 py-2 rounded w-full text-center animate-fade-in">
                  {error}
                </div>
              ) : null}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-royal hover:bg-royal-dark text-white font-semibold rounded-lg shadow transition"
                size="lg"
              >
                {isSubmitting ? (
                  <span>
                    <svg className="inline-block mr-2 animate-spin" width={18} height={18} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="31.415,31.415" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
          {/* Subtle divider & info */}
          <div className="border-t border-gray-200 my-6"></div>
          <div className="text-xs text-gray-400 text-center">
            We’ll never share your email. For urgent queries, email{" "}
            <a
              href="mailto:help.unknowniitians@gmail.com"
              className="text-royal underline hover:text-royal-dark"
            >
              help.unknowniitians@gmail.com
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailPopup;

