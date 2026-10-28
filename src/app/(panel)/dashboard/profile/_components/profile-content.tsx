"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ProfileformData, userProfileForm } from "./profile-form";
import Image from "next/image";
import ImageDemo from "../../../../../../public/foto1.png";
import { Controller } from "react-hook-form";
import { ClinicHoursSelector } from "./clinicHoursSelector";
import { Button } from "@/components/ui/button";
import { Prisma } from "@/generated/prisma/client";
import { updateProfile } from "../_actions/update-profile";
import { toast } from "sonner";
import { formatPhone } from "@/utils/formatPhone";

type UserWithSubscriptionProfile = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  };
}>;

interface ProfileContentProps {
  user: UserWithSubscriptionProfile;
}

export function ProfileContent({ user }: ProfileContentProps) {
  const form = userProfileForm({
    name: user.name,
    address: user.address,
    phone: user.phone,
    status: user.status,
    times: user.times,
    timeZone: user.timeZone,
  });

  const timeZone = Intl.supportedValuesOf("timeZone").filter(
    (zone) =>
      zone.startsWith("America/Sao_Paulo") ||
      zone.startsWith("America/Fortaleza") ||
      zone.startsWith("America/Recife") ||
      zone.startsWith("America/Bahia") ||
      zone.startsWith("America/Belem") ||
      zone.startsWith("America/Manaus") ||
      zone.startsWith("America/Cuiba") ||
      zone.startsWith("America/Boa_Vista"),
  );

  async function onSubmit(data: ProfileformData) {
    console.log(data.openingHours);

    const response = await updateProfile({
      name: data.name,
      address: data.address,
      phone: data.phone,
      status: data.status === "active" ? true : false,
      times: data.openingHours,
      timeZone: data.timeZone,
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.data);
  }

  return (
    <div className="mx-auto">
      <Field>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="p-0">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-extrabold text-slate-50 bg-teal-600 py-2 px-4">
                Meu perfil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Field>
                <FieldGroup>
                  <div className="flex justify-center flex-col space-y-6 ">
                    <div className="w-40 h-40 relative rounded-full overflow-hidden mx-auto">
                      <Image
                        src={user.image ? user.image : ImageDemo}
                        alt="Imagem da clinica"
                        className="object-cover"
                        loading="eager"
                        sizes="auto"
                        fill
                      />
                    </div>

                    <div className="space-y-3">
                      <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                              htmlFor="name"
                              className="font-bold text-slate-800"
                            >
                              Nome Completo
                            </FieldLabel>
                            <Input
                              {...field}
                              id="name"
                              aria-invalid={fieldState.invalid}
                              placeholder="Digite o nome da clinica..."
                              autoComplete="off"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <div className="w-full flex gap-2 flex-col md:flex-row">
                        <Controller
                          name="address"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel
                                htmlFor="address"
                                className="font-bold text-slate-800"
                              >
                                Endereço completo
                              </FieldLabel>
                              <Input
                                {...field}
                                id="address"
                                aria-invalid={fieldState.invalid}
                                placeholder="Digite o endereço..."
                                autoComplete="off"
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
                                placeholder="Digite o telefone..."
                                autoComplete="on"
                                onChange={(e) => {
                                  const formattedValue = formatPhone(
                                    e.target.value,
                                  );
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
                      <ClinicHoursSelector
                        control={form.control}
                        name="openingHours"
                      />

                      <div className="w-full flex gap-2 flex-col md:flex-row items-center">
                        <Controller
                          name="timeZone"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel
                                htmlFor="timeZone"
                                className="font-bold text-slate-800"
                              >
                                Selecione o fuso horário
                              </FieldLabel>
                              <Select
                                value={field.value}
                                name={field.name}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o seu fuso horário" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeZone.map((zone) => (
                                    <SelectItem value={zone} key={zone}>
                                      {zone}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="status"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel
                                htmlFor="status"
                                className="font-bold text-slate-800"
                              >
                                Status
                              </FieldLabel>
                              <Select
                                value={field.value}
                                name={field.name}
                                onValueChange={field.onChange}
                                defaultValue={
                                  field.value ? "active" : "inactive"
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o status da clinica" />
                                </SelectTrigger>
                                <SelectContent className="font-bold text-slate-800">
                                  <SelectItem value={"active"}>
                                    ATIVO(clinica aberta)
                                  </SelectItem>
                                  <SelectItem value={"inactive"}>
                                    INATIVO(clinica fechada)
                                  </SelectItem>
                                </SelectContent>
                              </Select>

                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </FieldGroup>
              </Field>
              <Button
                type="submit"
                className="px-8 bg-teal-600 hover:bg-teal-500 rounded-full w-full font-black  duration-300 transition hover:scale-[1.02] mb-3 "
              >
                Salvar modificações
              </Button>
            </CardContent>
          </Card>
        </form>
      </Field>
    </div>
  );
}
