
import React from "react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ImprovedToggleGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  items: {
    value: string;
    label: string;
  }[];
  className?: string;
  itemClassName?: string;
  title?: string;
}

const ImprovedToggleGroup: React.FC<ImprovedToggleGroupProps> = ({
  value,
  onValueChange,
  items,
  className,
  itemClassName,
  title
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {title && <h3 className="text-sm font-medium text-gray-700">{title}</h3>}
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(val) => {
          if (val) onValueChange(val);
        }}
        className="flex flex-wrap gap-2"
      >
        {items.map((item) => (
          <ToggleGroupItem
            key={item.value}
            value={item.value}
            className={cn(
              "rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium transition-colors",
              "data-[state=on]:bg-royal data-[state=on]:text-white",
              "hover:bg-gray-100 data-[state=on]:hover:bg-royal/90",
              itemClassName
            )}
          >
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default ImprovedToggleGroup;
