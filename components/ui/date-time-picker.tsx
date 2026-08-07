"use client";

import { useMemo } from "react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  value: string;
  onChange: (value: string) => void;

  dateOnly?: boolean;
}

export default function DateTimePicker({
  value,
  onChange,
  dateOnly = false,
}: Props) {
  const date = useMemo(() => {
    return value
      ? new Date(value)
      : undefined;
  }, [value]);

  const time = useMemo(() => {
    if (!value) {
      return "09:00";
    }

    return format(
      new Date(value),
      "HH:mm"
    );
  }, [value]);

  function updateDate(
    selectedDate: Date
  ) {
    if (dateOnly) {
      onChange(
        format(
          selectedDate,
          "yyyy-MM-dd"
        )
      );

      return;
    }

    const [hour, minute] =
      time
        .split(":")
        .map(Number);

    const result =
      new Date(selectedDate);

    result.setHours(
      hour,
      minute,
      0,
      0
    );

    onChange(
      result.toISOString()
    );
  }

  function updateTime(
    selectedTime: string
  ) {
    if (dateOnly) {
      return;
    }

    const base =
      date ?? new Date();

    const [hour, minute] =
      selectedTime
        .split(":")
        .map(Number);

    const result =
      new Date(base);

    result.setHours(
      hour,
      minute,
      0,
      0
    );

    onChange(
      result.toISOString()
    );
  }

return (
  <div
    className={
      dateOnly
        ? ""
        : "grid grid-cols-[1fr_140px] gap-3"
    }
  >
    <Popover>

      <PopoverTrigger className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-950 px-4 text-white transition hover:border-green-500">

        {date
          ? format(
              date,
              "dd MMM yyyy"
            )
          : "Select Date"}

        <CalendarIcon size={18} />

      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-auto rounded-xl border border-slate-700 bg-slate-900 p-3"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day) => {
            if (!day) {
              return;
            }

            updateDate(day);
          }}
        />
      </PopoverContent>

    </Popover>

    {!dateOnly && (
      <input
        type="time"
        value={time}
        onChange={(e) =>
          updateTime(
            e.target.value
          )
        }
        className="h-12 rounded-xl border border-slate-700 bg-slate-950 px-4 text-center text-white outline-none focus:border-green-500"
      />
    )}

  </div>
);
}