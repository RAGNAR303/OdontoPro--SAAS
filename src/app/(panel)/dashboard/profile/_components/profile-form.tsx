"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserProfileFormProps {
  name: string | null;
  address: string | null;
  phone: string | null;
  status: boolean | null;
  timeZone: string | null;
  times: string[] | null;
}

const profileschema = z.object({
  name: z.string().min(1, "O Nome e obrigatório"),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.string(),
  timeZone: z.string().min(1, "O fuso horario e obrigatório"),
  openingHours: z
    .array(z.string())
    .nonempty("Configure os horários para continuar"),
});

export type ProfileformData = z.infer<typeof profileschema>;

export function userProfileForm({
  address,
  name,
  phone,
  status,
  timeZone,
  times,
}: UserProfileFormProps) {
  return useForm({
    resolver: zodResolver(profileschema),
    defaultValues: {
      name: name || "",
      address: address || "",
      phone: phone || "",
      status: status ? "active" : "inactive",
      timeZone: timeZone || "",
      openingHours: times || [],
    },
  });
}
