
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useBackend } from "@/components/BackendIntegratedWrapper";
import { Loader2, Star, Plus } from "lucide-react";

interface Recommendation {
  id: string;
  name: string;
  position: string;
  company: string;
  recommendation_text: string;
  image_url?: string;
  rating: number;
  category: string;
  created_at: string;
}

const DistinguishedRecomendees = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const { isAdmin } = useBackend();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      console.log('Fetching recommendations...');
      const { data, error } = await supabase
        .from('recommendations')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
      }
      
      console.log('Fetched recommendations:', data);
      setRecommendations(data || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Set empty array to prevent white screen
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const displayedRecommendations = showAll ? recommendations : recommendations.slice(0, 6);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-golden fill-golden' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <>
      <NavBar />
      <main className="pt-20 bg-slate-50 min-h-screen">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Distinguished <span className="text-golden">Recomendees</span>
            </h1>
            <p className="text-lg text-gray-200 mb-6 max-w-3xl mx-auto">
              Hear from professionals, educators, and industry leaders who recommend our programs and services.
            </p>
            {isAdmin && (
              <Button className="bg-golden hover:bg-golden/90 text-royal font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                Add New Recommendation
              </Button>
            )}
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-royal" />
                <span className="ml-2 text-lg">Loading recommendations...</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedRecommendations.map((recommendation) => (
                    <Card key={recommendation.id} className="shadow-premium hover:shadow-premium-hover transition-all duration-300 border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          {recommendation.image_url && (
                            <img
                              src={recommendation.image_url}
                              alt={recommendation.name}
                              className="w-16 h-16 rounded-full object-cover mr-4"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{recommendation.name}</h3>
                            <p className="text-royal font-medium">{recommendation.position}</p>
                            <p className="text-gray-600 text-sm">{recommendation.company}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex mr-2">
                            {renderStars(recommendation.rating)}
                          </div>
                          <Badge variant="secondary" className="bg-royal/10 text-royal">
                            {recommendation.category}
                          </Badge>
                        </div>
                        
                        <blockquote className="text-gray-700 italic leading-relaxed">
                          "{recommendation.recommendation_text}"
                        </blockquote>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {recommendations.length > 6 && (
                  <div className="text-center mt-12">
                    <Button
                      onClick={() => setShowAll(!showAll)}
                      className="bg-royal hover:bg-royal-dark text-white px-8 py-3 text-lg"
                    >
                      {showAll ? 'Show Less' : 'View All Recommendations'}
                    </Button>
                  </div>
                )}

                {recommendations.length === 0 && !loading && (
                  <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">No recommendations available at the moment.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DistinguishedRecomendees;
