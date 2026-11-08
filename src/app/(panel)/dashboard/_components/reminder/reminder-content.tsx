"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { ImPlus } from "react-icons/im";
import { ReminderFormData, useReminderForm } from "./reminder-form";
import { toast } from "sonner";
import { createReminder } from "../../_actions/create-reminder";

export function ReminderContent() {
  const form = useReminderForm();
  const [openDialog, setOpenDialog] = useState(false);

  async function handleCreateReminder(value: ReminderFormData) {
    if (!value) {
      toast.error("Campo de lembrete e obrigatório");
      return;
    }

    const response = await createReminder({ description: value.description });

    if (!response.data) {
      toast.error(response.error);
      return;
    }

    toast.success(response.data);
  }

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button
            size={"icon-sm"}
            className=" bg-slate-200 hover:bg-slate-100 rounded-full w-fit font-black  duration-300 transition hover:scale-[1.02] p-2  "
          >
            <ImPlus className="text-3xl text-teal-600 animate-pulse" />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col rounded-md max-w-106">
          <DialogTitle className="font-bold text-xl text-slate-900">
            Novo lembrete
          </DialogTitle>
          <form onSubmit={form.handleSubmit(handleCreateReminder)}>
            <Field>
              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="description"
                      className="font-bold text-slate-800"
                    >
                      Descrição do lembrete
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="description"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite o lembrete..."
                      className="resize-none"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </Field>
            <Button
              type="submit"
              className={
                "px-8 bg-teal-600 hover:bg-teal-500 font-black w-full duration-300 transition hover:scale-[1.02] mt-3"
              }
            >
              Salvar lembrete
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
