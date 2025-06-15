
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ImportantDate {
  id: string;
  title: string;
  description: string;
  date_value: string;
  exam_type: string;
  tag: string;
  category: string;
  branch: string;
  level: string;
  is_highlighted: boolean;
}

const ImportantDatesTab = () => {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('important_dates')
          .select('*')
          .or('exam_type.eq.IITM_BS,exam_type.is.null')
          .order('date_value', { ascending: true });

        if (error) throw error;
        setDates(data || []);
      } catch (error: any) {
        setError("Failed to fetch important dates. Please try again later.");
        console.error("Error fetching important dates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDates();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }
  
  return (
    <div className="space-y-4">
      {dates.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No important dates available for IITM BS at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
            {dates.map((date) => (
                <Card key={date.id} className={`flex ${date.is_highlighted ? 'border-royal border-2' : ''}`}>
                    <div className="p-4 bg-royal/10 flex flex-col items-center justify-center rounded-l-lg min-w-[80px]">
                        <span className="text-royal text-2xl font-bold">{new Date(date.date_value).getDate()}</span>
                        <span className="text-royal text-sm uppercase">{new Date(date.date_value).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div className="flex-1 p-4">
                        <CardTitle className="text-base font-semibold">{date.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{date.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {date.category && <Badge variant="outline">{date.category}</Badge>}
                            {date.tag && <Badge variant="secondary">{date.tag}</Badge>}
                            {date.branch && <Badge variant="outline">{date.branch}</Badge>}
                            {date.level && <Badge variant="outline">{date.level}</Badge>}
                            {date.is_highlighted && <Badge className="bg-royal text-white">Highlighted</Badge>}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default ImportantDatesTab;
