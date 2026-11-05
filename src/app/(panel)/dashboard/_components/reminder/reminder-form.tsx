"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ReminderFormProps {
  description: string;
}

const formSchema = z.object({
  description: z.string().min(1, "Descreva um  lembrete"),
});

type ReminderFormData = z.infer<typeof formSchema>;

export function ReminderForm({ description }: ReminderFormProps) {
  return useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description,
    },
  });
}
