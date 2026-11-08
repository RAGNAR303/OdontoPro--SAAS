"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function AppoitmentsList({ times }: { times: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  console.log(date);

  return (
    <div>
      <h2>times</h2>
    </div>
  );
}
