
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Briefcase, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Recommendation {
  id: string;
  name: string;
  position: string;
  company: string;
  recommendation_text: string;
  rating: number;
  image_url?: string;
  category?: string;
}

const FeaturedRecommendees = () => {
  const [featuredRecommendations, setFeaturedRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedRecommendations();
  }, []);

  const fetchFeaturedRecommendations = async () => {
    try {
      const { data, error } = await supabase
        .from('recommendations')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setFeaturedRecommendations(data || []);
    } catch (error) {
      console.error('Error fetching featured recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  if (loading || featuredRecommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Distinguished Recommendees
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from our accomplished alumni and industry professionals who have excelled in their careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredRecommendations.map((recommendation) => (
            <Card key={recommendation.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6">
                {/* Profile Section */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-royal to-royal-dark flex items-center justify-center text-white font-bold text-sm mr-3">
                    {recommendation.image_url ? (
                      <img
                        src={recommendation.image_url}
                        alt={recommendation.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      recommendation.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-royal transition-colors">
                      {recommendation.name}
                    </h3>
                    <div className="flex items-center text-gray-600 text-xs mb-1">
                      <Briefcase className="w-3 h-3 mr-1" />
                      <span>{recommendation.position}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-xs">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{recommendation.company}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex mr-2">
                    {renderStars(recommendation.rating)}
                  </div>
                  <span className="text-xs text-gray-600">({recommendation.rating}/5)</span>
                </div>

                {/* Recommendation Text */}
                <blockquote className="text-gray-700 text-sm italic line-clamp-3">
                  "{recommendation.recommendation_text}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/distinguished-recommendees">
            <Button className="bg-royal hover:bg-royal-dark text-white px-8 py-3 text-lg font-semibold group">
              View All Recommendations
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecommendees;
