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
import { useState, useCallback, useEffect } from "react";
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
import { ScheduleTimeSlots } from "./schedule-timeslots";
import { Label } from "@/components/ui/label";
import { createAppointment } from "../_actions/create-appointments";
import { toast } from "sonner";
import { Footer } from "@/app/(public)/_components/footer";

export type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription;
}

export interface TimeSlots {
  time: string;
  available: boolean;
}

export function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useScheduleForms();
  const { watch } = form;
  const selectedDate = watch("date");
  const selectedServiceId = watch("serviceId");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<null | string>("");
  const [availableTimesSlots, setAvailableTimesSlots] = useState<TimeSlots[]>(
    [],
  );

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

  const fetchBlockedTimes = useCallback(
    async (date: Date): Promise<string[]> => {
      setLoadingSlots(true);
      try {
        const dateString = date.toISOString().split("T")[0];

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`,
        );

        const blocked = await response.json();
        setLoadingSlots(false);
        return blocked;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    [clinic.id],
  );

  useEffect(() => {
    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then((blocked) => {
        setBlockedTimes(blocked);

        const times = clinic.times || [];
        const finalSlots = times.map((time) => ({
          time: time,
          available: !blocked.includes(time),
        }));

        setAvailableTimesSlots(finalSlots);

        const stillAvailable = finalSlots.find(
          (slot) => slot.time === selectedTime && slot.available,
        );

        if (!stillAvailable) {
          setSelectedTime("");
        }
      });
    }
  }, [selectedDate, clinic.times, fetchBlockedTimes, selectedTime]);

  console.log(selectedService);

  async function handleRegisterAppointment(formData: AppointmentFormData) {
    if (!selectedTime) {
      return;
    }
    setLoading(true);

    const response = await createAppointment({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceId: formData.serviceId,
      time: selectedTime,
      clinicId: clinic.id,
      date: formData.date,
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Agendamento realizado com sucesso!");
    setLoading(false);
    form.reset();
    setSelectedTime("");
  }

  return (
    <main className="flex flex-col min-h-screen ">
      <div className="h-32 bg-teal-500 shadow shadow-black/50 rounded-b-xl" />
      <div className="flex flex-col items-center mx-auto w-full max-w-2xl -mt-20">
        <div className="w-40 h-40 relative rounded-full overflow-hidden border-2 border-white shadow shadow-black/50">
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
          className="w-19/20 py-2"
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
              <div className="w-full flex gap-2 flex-col md:flex-row items-center">
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
              </div>
              <div className="w-full flex gap-2 flex-col md:flex-row items-center">
                <Controller
                  name="serviceId"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const selectedService = clinic.services?.find(
                      (service) => service.id === field.value,
                    );

                    return (
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
                          onValueChange={(value) => {
                            setSelectedService(value);
                            field.onChange(value);
                            setSelectedTime("");
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={`${clinic.services.length}  Serviços disponiveis`}
                            >
                              {selectedService ? selectedService.name : null}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {clinic.services?.map((service) => {
                              return (
                                <SelectItem
                                  value={service.id}
                                  key={service.id}
                                  aria-placeholder=""
                                  className={
                                    "flex items-center justify-between"
                                  }
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
                    );
                  }}
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
                            setSelectedTime("");
                          }
                        }}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </Field>

          {selectedService && (
            <div className="space-y-2 py-3">
              <Label className="font-bold text-slate-800">
                Horarios disponiveis
              </Label>

              <div>
                {loadingSlots ? (
                  <p className="font-bold text-slate-950 animate-pulse ">
                    Carregando horários...
                  </p>
                ) : availableTimesSlots.length === 0 ? (
                  <p className="font-bold text-red-300 ">
                    Nenhum horário disponível
                  </p>
                ) : (
                  <ScheduleTimeSlots
                    clinicsTimes={clinic.times}
                    blockedTimes={blockedTimes}
                    availableTimesSlots={availableTimesSlots}
                    selectedTime={selectedTime}
                    selectedDate={selectedDate}
                    onTimeSelected={(time) => setSelectedTime(time)}
                    requiredSlots={
                      clinic.services.find(
                        (service) => service.id === selectedServiceId,
                      )
                        ? Math.ceil(
                            clinic.services.find(
                              (service) => service.id === selectedServiceId,
                            )!.duration / 30,
                          )
                        : 1
                    }
                  />
                )}
              </div>
            </div>
          )}

          {clinic.status === true ? (
            <Button
              type="submit"
              disabled={
                !watch("name") ||
                !watch("email") ||
                !watch("phone") ||
                !watch("serviceId") ||
                !selectedTime
              }
              className={cn(
                "px-8 bg-teal-600 hover:bg-teal-500 rounded-full w-full font-black  duration-300 transition hover:scale-[1.02] mt-3",
                { "bg-zinc-500": loading },
              )}
            >
              Realizar agendamento
            </Button>
          ) : (
            <p className="px-8 py-1 bg-red-400 rounded-full w-full font-black text-white my-4">
              Clinica fechada no momento
            </p>
          )}
        </form>
      </div>
      <Footer />
    </main>
  );
}
