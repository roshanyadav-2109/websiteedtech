
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Send } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const TestimonialForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    company: "",
    position: "",
    testimonial_text: "",
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a testimonial.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([{
          ...formData,
          user_id: user.id,
          email: user.email
        }]);

      if (error) throw error;

      toast({
        title: "Testimonial Submitted!",
        description: "Thank you for your feedback. It will be reviewed before publication.",
      });

      // Reset form
      setFormData({
        name: "",
        email: user?.email || "",
        company: "",
        position: "",
        testimonial_text: "",
        rating: 5
      });
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your testimonial. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-royal to-royal-dark text-white">
        <CardTitle className="flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Share Your Testimonial
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="mt-1"
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company/Organization</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="position">Position/Role</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="rating">Rating *</Label>
            <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({...formData, rating: parseInt(value)})}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">⭐⭐⭐⭐⭐ (5 Stars)</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐ (4 Stars)</SelectItem>
                <SelectItem value="3">⭐⭐⭐ (3 Stars)</SelectItem>
                <SelectItem value="2">⭐⭐ (2 Stars)</SelectItem>
                <SelectItem value="1">⭐ (1 Star)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="testimonial">Your Testimonial *</Label>
            <Textarea
              id="testimonial"
              value={formData.testimonial_text}
              onChange={(e) => setFormData({...formData, testimonial_text: e.target.value})}
              required
              rows={4}
              className="mt-1"
              placeholder="Share your experience with Unknown IITians..."
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-royal hover:bg-royal-dark text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Testimonial"}
          </Button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          * Your testimonial will be reviewed before being published on our website.
        </p>
      </CardContent>
    </Card>
  );
};

export default TestimonialForm;
