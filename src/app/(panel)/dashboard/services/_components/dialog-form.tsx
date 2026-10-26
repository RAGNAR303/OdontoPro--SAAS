"use client"


import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

export interface DialogFormProps {
  initialValue?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

const serviceSchema = z.object({
  name: z.string().min(3, "O nome do serviço e obrigatório"),
  price: z.string().min(3, "O valor do serviço e obrigatório"),
  hours: z.string(),
  minutes: z.string(),
});

export type DialogFormData = z.infer<typeof serviceSchema>;

export function DialogForm({ initialValue }: DialogFormProps) {
  return useForm<DialogFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialValue || {
      name: "",
      price: "",
      hours: "",
      minutes: "",
    },
  });
}
