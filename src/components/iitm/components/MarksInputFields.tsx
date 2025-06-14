
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Field {
  id: string;
  label: string;
  min: number;
  max: number;
}

interface MarksInputFieldsProps {
  fields: Field[];
  form: Record<string, string>;
  onFormChange: (newForm: Record<string, string>) => void;
}

export default function MarksInputFields({ fields, form, onFormChange }: MarksInputFieldsProps) {
  const handleInputChange = (fieldId: string, value: string) => {
    onFormChange({ ...form, [fieldId]: value });
  };

  return (
    <>
      {fields.filter(f => f.id !== "F").map(field => (
        <div key={field.id}>
          <Label>{field.label}</Label>
          <Input
            type="number"
            min={field.min}
            max={field.max}
            value={form[field.id] ?? ""}
            placeholder="0"
            onChange={e => handleInputChange(field.id, e.target.value)}
            inputMode="numeric"
          />
        </div>
      ))}
    </>
  );
}
