"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { ptBR } from "date-fns/locale/pt-BR";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

interface DateTimePickerProps {
  minDate?: Date;
  className?: string;
  initialDate?: Date;
  onChange: (date: Date) => void;
}

export function CalanderDatePicker({
  onChange,
  className,
  initialDate,
  minDate,
}: DateTimePickerProps) {
  const [startDate, setStartDate] = useState(initialDate || new Date());

  function handleChange(date: Date | null) {
    if (date) {
      console.log(date);
      setStartDate(date);
      onChange(date);
    }
  }

  return (
    <DatePicker
      className={` w-full rounded-md border border-input  p-1 px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none  ${className}`}
      selected={startDate}
      locale={ptBR}
      minDate={minDate ?? new Date()}
      onChange={handleChange}
      dateFormat={"dd/MM/yyyy"}
    />
  );
}
