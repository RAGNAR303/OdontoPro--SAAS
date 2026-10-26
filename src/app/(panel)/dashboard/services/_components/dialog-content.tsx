"use client";

import { DialogContent } from "@/components/ui/dialog";
import { DialogForm, DialogFormData } from "./dialog-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertRealToCents } from "@/utils/convertCurrency";
import { createService } from "../_actions/create-service";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "cn";
import { useRouter } from "next/navigation";
import { editService } from "../_actions/edit-service";

interface ServiceFormProps {
  serviceId?: string;

  initialValue?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };

  onCloseModal: () => void;
}

export function ServiceForm({
  onCloseModal,
  serviceId,
  initialValue,
}: ServiceFormProps) {
  const form = DialogForm({ initialValue });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function onSubmit(values: DialogFormData) {
    setLoading(true);
    const priceInCents = convertRealToCents(values.price);
    const hours = parseInt(values.hours!) || 0;
    const minutes = parseInt(values.minutes!) || 0;
    const duration = hours * 60 + minutes;

    if (serviceId) {
      const response = await editServiceById({
        duration: duration,
        name: values.name,
        priceInCents: priceInCents,
        serviceId: serviceId,
      });

      console.log(response);

      return;
    }

    console.log(values.name, duration, priceInCents);

    const response = await createService({
      name: values.name,
      price: priceInCents,
      duration: duration,
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    }
    handleCloseModal();
    toast.success(`Serviço ${response.data?.name} criado com sucesso!`);
  }

  function handleCloseModal() {
    onCloseModal();
    form.reset();
    router.refresh();
  }

  async function editServiceById({
    duration,
    name,
    priceInCents,
    serviceId,
  }: {
    name: string;
    serviceId: string;
    priceInCents: number;
    duration: number;
  }) {
    const response = await editService({
      name: name,
      id: serviceId,
      price: priceInCents,
      duration: duration,
    });
    if (response.error) {
      toast.error(response.error);
    }

    handleCloseModal();
    toast.success(response.data);
  }

  function formatPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;

    value = value.replace(/\D/g, "");

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace(".", ",");
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    event.target.value = value;
    form.setValue("price", value);
  }

  return (
    <div>
      <div className="space-y-1 mb-2">
        <h3 className="font-bold text-xl">
          {serviceId ? "Editar serviço" : "Novo serviço"}
        </h3>
        <p className="text-slate-600">
          {serviceId ? "Editar serviço existente" : "Adicione um novo serviço"}
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Field>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="name"
                    className="font-bold text-slate-800"
                  >
                    Nome do serviço
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite o nome do serviço..."
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="name"
                    className="font-bold text-slate-800"
                  >
                    Valor do serviço
                  </FieldLabel>
                  <Input
                    {...field}
                    id="price"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex. R$ 120,00"
                    autoComplete="on"
                    onChange={formatPriceChange}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <section>
              <p className="font-bold text-slate-800">
                Tempo de duração do serviço:
              </p>
              <div className="flex items-center mt-2 justify-center gap-2">
                <Controller
                  name="hours"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="name"
                        className="font-bold text-slate-800"
                      >
                        Horas:
                      </FieldLabel>
                      <Input
                        {...field}
                        id="hours"
                        aria-invalid={fieldState.invalid}
                        placeholder="1"
                        autoComplete="on"
                        type="number"
                        min="0"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <strong className="self-center text-4xl">:</strong>
                <Controller
                  name="minutes"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="name"
                        className="font-bold text-slate-800"
                      >
                        Minutos:
                      </FieldLabel>
                      <Input
                        {...field}
                        id="price"
                        aria-invalid={fieldState.invalid}
                        placeholder="00"
                        autoComplete="on"
                        type="number"
                        min="0"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </section>
          </FieldGroup>
        </Field>
        <Button
          type="submit"
          disabled={loading}
          className={cn(
            "px-8 bg-teal-600 hover:bg-teal-500 rounded-full w-full font-black  duration-300 transition hover:scale-[1.02] mt-3",
            { "bg-zinc-500": loading },
          )}
        >
          {loading
            ? `${serviceId ? "Salvando..." : "Cadastrando..."}`
            : `${serviceId ? "Salvar alterações" : "Cadastrar serviço"}`}
        </Button>
      </form>
    </div>
  );
}
