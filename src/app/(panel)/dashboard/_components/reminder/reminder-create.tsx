"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { ImPlus } from "react-icons/im";

export function ReminderCreate() {
  const [openDialog, setOpenDialog] = useState(false);

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
        <DialogContent>
          <h2>Novo lembrete</h2>
          {/* <form>
            <Field>
              <Controller
                name="description"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="description"
                      className="font-bold text-slate-800"
                    >
                      Descrição
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="description"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite a nome do serviço..."
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </Field>
          </form> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
