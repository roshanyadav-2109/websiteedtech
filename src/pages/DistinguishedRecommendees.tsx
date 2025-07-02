
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Briefcase, MapPin } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
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
  is_active: boolean;
}

const DistinguishedRecommendees = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const { data, error } = await supabase
        .from('recommendations')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecommendations(data || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...Array.from(new Set(recommendations.map(r => r.category).filter(Boolean)))];

  const filteredRecommendations = selectedCategory === "All" 
    ? recommendations 
    : recommendations.filter(r => r.category === selectedCategory);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading recommendations...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Distinguished Recommendees
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover testimonials from our accomplished alumni and industry professionals 
              who have excelled in their careers after being part of our community.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-royal text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecommendations.map((recommendation) => (
              <Card key={recommendation.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6">
                  {/* Profile Section */}
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-royal to-royal-dark flex items-center justify-center text-white font-bold text-xl mr-4">
                      {recommendation.image_url ? (
                        <img
                          src={recommendation.image_url}
                          alt={recommendation.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        recommendation.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-royal transition-colors">
                        {recommendation.name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm mb-1">
                        <Briefcase className="w-4 h-4 mr-1" />
                        <span>{recommendation.position}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{recommendation.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {renderStars(recommendation.rating)}
                    </div>
                    <span className="text-sm text-gray-600">({recommendation.rating}/5)</span>
                  </div>

                  {/* Recommendation Text */}
                  <blockquote className="text-gray-700 italic mb-4 line-clamp-4">
                    "{recommendation.recommendation_text}"
                  </blockquote>

                  {/* Category Badge */}
                  {recommendation.category && (
                    <Badge variant="secondary" className="bg-royal/10 text-royal hover:bg-royal/20">
                      {recommendation.category}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredRecommendations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Star className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No recommendations found
              </h3>
              <p className="text-gray-600">
                {selectedCategory === "All" 
                  ? "We're working on adding more distinguished recommendees. Check back soon!"
                  : `No recommendations found in the "${selectedCategory}" category.`
                }
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DistinguishedRecommendees;
