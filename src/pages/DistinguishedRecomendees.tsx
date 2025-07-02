
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Award, Building, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface Recommendation {
  id: string;
  name: string;
  position: string;
  company: string;
  recommendation_text: string;
  image_url?: string;
  rating?: number;
  category?: string;
  is_active: boolean;
}

const DistinguishedRecomendees = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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

  const categories = ['All', ...Array.from(new Set(recommendations.map(r => r.category).filter(Boolean)))];
  
  const filteredRecommendations = selectedCategory === 'All' 
    ? recommendations 
    : recommendations.filter(r => r.category === selectedCategory);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
          <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <Card className="h-64 bg-gray-200"></Card>
                </div>
              ))}
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Distinguished Recommendees
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover professionals who have been highly recommended for their exceptional work and contributions
            </p>
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Recommendations Grid */}
          {filteredRecommendations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((recommendation) => (
                <Card key={recommendation.id} className="group hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      {recommendation.image_url ? (
                        <img
                          src={recommendation.image_url}
                          alt={recommendation.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                          {recommendation.name.charAt(0)}
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {recommendation.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Briefcase className="h-4 w-4" />
                          <span className="font-medium">{recommendation.position}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building className="h-4 w-4" />
                          <span>{recommendation.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    {recommendation.rating && (
                      <div className="flex items-center gap-1 mb-4">
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
                        <span className="text-sm text-gray-600 ml-1">
                          ({recommendation.rating}/5)
                        </span>
                      </div>
                    )}

                    {/* Recommendation Text */}
                    <blockquote className="text-gray-700 italic leading-relaxed mb-4 relative">
                      <span className="text-4xl text-blue-200 absolute -top-2 -left-2">"</span>
                      <p className="relative z-10">{recommendation.recommendation_text}</p>
                    </blockquote>

                    {/* Category Badge */}
                    {recommendation.category && (
                      <div className="flex justify-end">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {recommendation.category}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Recommendations Found
              </h3>
              <p className="text-gray-500">
                {selectedCategory === 'All' 
                  ? "No recommendations are currently available."
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

export default DistinguishedRecomendees;
