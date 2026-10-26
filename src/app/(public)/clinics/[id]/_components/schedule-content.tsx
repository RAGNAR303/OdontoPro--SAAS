"use client";

import Image from "next/image";
import imgTest from "../../../../../../public/foto1.png";
import { IoMdPin } from "react-icons/io";
import { AppointmentFormData, useScheduleForms } from "./schedule-forms";
import { Prisma } from "@/generated/prisma/client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "cn";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { formatPhone } from "@/utils/formatPhone";
import { CalanderDatePicker } from "./calanderPicker";
import { TbClockFilled } from "react-icons/tb";

export type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription;
}

interface TimeSlots {
  time: string;
  available: boolean;
}

export function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useScheduleForms();
  const [loading, setLoading] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState("");
  const [availableTimesSlots, setAvailableTimesSlots] = useState<TimeSlots[]>(
    [],
  );
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);
  const { watch } = form;

  console.log(clinic.services);

  async function handleRegisterAppointment(formData: AppointmentFormData) {
    console.log(formData);
  }

  return (
    <main className="flex flex-col min-h-screen">
      <div className="h-32 bg-teal-500 shadow shadow-black/50 rounded-b-xl" />
      <div className="flex flex-col items-center mx-auto max-w-3xl -mt-20">
        <div className="w-40 h-40 relative rounded-full overflow-hidden border-2 border-teal-500 shadow shadow-black/50">
          <Image
            src={clinic.image ? clinic.image : imgTest}
            alt="Foto da clinica"
            fill
            className="object-cover"
            loading="eager"
            sizes=""
          />
        </div>

        <div className="flex flex-col items-center">
          <span className="font-bold text-xl text-slate-800">
            {clinic.name}
          </span>
          <span className="flex items-center text-slate-600">
            <IoMdPin />{" "}
            {clinic.address ? clinic.address : "Endereço não informado"}
          </span>
        </div>

        <form
          onSubmit={form.handleSubmit(handleRegisterAppointment)}
          className="w-full"
        >
          <Field>
            <FieldGroup className="gap-1">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="name"
                      className="font-bold text-slate-800"
                    >
                      Nome
                    </FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu nome..."
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="email"
                      className="font-bold text-slate-800"
                    >
                      E-mail
                    </FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="exemplo@email.com"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* 
              <div className="flex items-center mt-2 justify-center gap-2"> */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="phone"
                      className="font-bold text-slate-800"
                    >
                      Telefone
                    </FieldLabel>
                    <Input
                      {...field}
                      id="phone"
                      aria-invalid={fieldState.invalid}
                      placeholder="(11) 98765-4321"
                      autoComplete="on"
                      onChange={(e) => {
                        const formattedValue = formatPhone(e.target.value);

                        field.onChange(formattedValue);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="serviceId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="serviceId"
                      className="font-bold text-slate-800"
                    >
                      Selecione serviço
                    </FieldLabel>
                    <Select
                      value={field.value}
                      name={field.name}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`${clinic.services.length}  Serviços disponiveis`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {clinic.services?.map((service) => {
                          return (
                            <SelectItem
                              value={service.id}
                              key={service.id}
                              aria-placeholder=""
                              className={"flex items-center justify-between"}
                            >
                              {service.name} -<TbClockFilled />
                              {Math.floor(service.duration / 60)}h{" "}
                              {service.duration % 60} min
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="date"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="date"
                      className="font-bold text-slate-800"
                    >
                      Data do agendamento
                    </FieldLabel>
                    <CalanderDatePicker
                      initialDate={new Date()}
                      onChange={(date) => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </Field>

          {clinic.status === true ? (
            <Button
              type="submit"
              disabled={
                watch("date") ||
                watch("email") ||
                watch("name") ||
                watch("phone") ||
                watch("serviceId")
              }
              className={cn(
                "px-8 bg-teal-600 hover:bg-teal-500 rounded-full w-full font-black  duration-300 transition hover:scale-[1.02] mt-3",
                { "bg-zinc-500": loading },
              )}
            >
              Agendar horario
            </Button>
          ) : (
            <p className="px-8 py-1 bg-red-400 rounded-full w-full font-black text-white my-4">
              Clinica fechada no momento
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
