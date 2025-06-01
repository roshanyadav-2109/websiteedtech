
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AdminAddButtonProps {
  contentType: string;
  examType?: string;
  onAdd: () => void;
}

const AdminAddButton: React.FC<AdminAddButtonProps> = ({ contentType, examType, onAdd }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setIsAdmin(data?.session?.user?.email === "help.unknowniitians@gmail.com");
      } catch (error) {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAdmin(session?.user?.email === "help.unknowniitians@gmail.com");
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!isAdmin) return null;

  return (
    <Button 
      onClick={onAdd}
      className="bg-royal hover:bg-royal-dark text-white"
      size="sm"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add {contentType}
    </Button>
  );
};

export default AdminAddButton;
