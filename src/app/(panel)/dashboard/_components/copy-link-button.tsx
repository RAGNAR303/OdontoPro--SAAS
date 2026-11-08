"use client";

import { Button } from "@/components/ui/button";
import { FaLink } from "react-icons/fa";
import { toast } from "sonner";
export function CopyLinkButton({ userId }: { userId: string }) {
  async function handlecopyLink() {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/clinics/${userId}`,
    );

    toast.success("Link copiado com sucesso");
  }

  return (
    <Button onClick={handlecopyLink} className={"rounded-4xl"}>
      <FaLink />
    </Button>
  );
}
