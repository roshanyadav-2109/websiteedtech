
import FilterButton from "./FilterButton";

interface FilterGroupProps {
  title: string;
  options: string[];
  activeOption: string;
  onChange: (option: string) => void;
  className?: string;
}

const FilterGroup = ({ title, options, activeOption, onChange, className = "" }: FilterGroupProps) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <div className="flex flex-wrap">
        {options.map((option) => (
          <FilterButton
            key={option}
            label={option}
            isActive={activeOption === option}
            onClick={() => onChange(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;
