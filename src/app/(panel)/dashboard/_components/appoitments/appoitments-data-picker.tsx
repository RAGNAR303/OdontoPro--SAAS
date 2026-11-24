"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export function AppoitmentDataPicker() {
  const [isDateChange, setIsDateChenge] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const router = useRouter();

  function handleChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
    const date = event.target.value;
    setIsDateChenge(date);

    const url = new URL(window.location.href);

    url.searchParams.set("date", date);

    router.push(url.toString());
  }

  return (
    <input
      type="date"
      id="date"
      value={isDateChange}
      onChange={handleChangeDate}
      className="bg-white rounded px-2 py-1 font-bold text-slate-700"
    />
  );
}
