
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Recommendation {
  id: string;
  name: string;
  position: string;
  company: string;
  recommendation_text: string;
  image_url?: string;
  rating?: number;
  category?: string;
}

const FeaturedRecommendees = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
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
      setRecommendations(data || []);
    } catch (error) {
      console.error('Error fetching featured recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="border py-1 px-4 rounded-lg font-semibold text-royal bg-white">
              Featured Recommendees
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-5">
            Distinguished Professionals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet exceptional professionals who have been highly recommended for their outstanding contributions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recommendations.map((recommendation) => (
            <Card key={recommendation.id} className="group hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  {recommendation.image_url ? (
                    <img
                      src={recommendation.image_url}
                      alt={recommendation.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {recommendation.name.charAt(0)}
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {recommendation.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">{recommendation.position}</p>
                    <p className="text-sm text-gray-500">{recommendation.company}</p>
                  </div>
                </div>

                {/* Rating */}
                {recommendation.rating && (
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < recommendation.rating!
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Recommendation Text - Truncated */}
                <blockquote className="text-gray-700 italic leading-relaxed">
                  <p className="line-clamp-3">
                    "{recommendation.recommendation_text}"
                  </p>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/distinguished-recommendees">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              View All Recommendations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecommendees;
