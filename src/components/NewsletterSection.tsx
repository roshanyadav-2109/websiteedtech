
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call - replace with actual backend integration
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Subscribed successfully!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-royal/10 to-royal/5 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for the latest resources and updates.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-grow relative">
              <Input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 w-full border-royal/20 focus:border-royal"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-to-r from-royal to-royal-dark hover:from-royal-dark hover:to-royal text-white px-6 h-11 rounded-md whitespace-nowrap"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
