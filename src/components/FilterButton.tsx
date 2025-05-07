
import { Button } from "@/components/ui/button";

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton = ({ label, isActive, onClick }: FilterButtonProps) => {
  return (
    <Button 
      onClick={onClick} 
      variant={isActive ? "filterActive" : "filter"} 
      size="filter"
      className="transition-all duration-200 mb-2 mr-2"
    >
      {label}
    </Button>
  );
};

export default FilterButton;
