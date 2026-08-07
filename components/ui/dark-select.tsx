"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface DarkSelectOption {
  label: string;
  value: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: DarkSelectOption[];
  placeholder?: string;
}

export default function DarkSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
}: Props) {
  return (
    <Select
      value={value || null}
      onValueChange={(value) => {
        onChange(value ?? "");
      }}
    >
      <SelectTrigger className="h-12 w-full rounded-xl border-slate-700 bg-slate-950 text-white hover:border-green-500 focus-visible:border-green-500">

        <SelectValue placeholder={placeholder} />

      </SelectTrigger>

      <SelectContent className="border-slate-700 bg-slate-900 text-white">

        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="
              bg-slate-900
              text-slate-200
              hover:bg-green-600
              hover:text-white
              focus:bg-green-600
              focus:text-white
              data-[highlighted]:bg-green-600
              data-[highlighted]:text-white
            "
          >
            {option.label}
          </SelectItem>
        ))}

      </SelectContent>

    </Select>
  );
}