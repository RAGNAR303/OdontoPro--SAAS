"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const scheduleForms = z.object({
  name: z.string().min(3, "O Nome e obrigatório"),
  email: z.email().min(1, "O Email e obrigatório"),
  phone: z.string().min(1, "O Telefone e obrigatório"),
  date: z.date(),
  serviceId: z.string().min(1, "Selecione um serviço disponivel"),
});

export type AppointmentFormData = z.infer<typeof scheduleForms>;

export function useScheduleForms() {
  return useForm<AppointmentFormData>({
    resolver: zodResolver(scheduleForms),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: new Date(),
      serviceId: "",
    },
  });
}
