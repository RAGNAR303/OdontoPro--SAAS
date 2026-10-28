"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "cn";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 7; h <= 20; h++) {
    for (let m = 0; m < 2; m++) {
      const hour = h.toString().padStart(2, "0");
      const minute = (m * 30).toString().padStart(2, "0");
      slots.push(`${hour}:${minute}`);
    }
  }
  return slots;
}

const hours = generateTimeSlots();

// Definimos a interface para receber o control do formulário pai
interface ClinicHoursSelectorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export function ClinicHoursSelector<T extends FieldValues>({
  control,
  name,
}: ClinicHoursSelectorProps<T>) {
  return (
    <div className="space-y-2">
      <Label className="font-bold text-slate-800">Configurar horários</Label>

      {/* Usamos o Controller para integrar o estado dos horários com o formulário */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          // field.value será um array (ex: ['08:00', '08:30'])
          const selectedHours: string[] = field.value || [];

          function toggleHours(hour: string) {
            const updatedHours = selectedHours.includes(hour)
              ? selectedHours.filter((h) => h !== hour)
              : [...selectedHours, hour].sort();

            // Atualiza o valor dentro do React Hook Form
            field.onChange(updatedHours);
          }

          return (
            <Dialog>
              <DialogTrigger className={"min-w-full"} asChild>
                <Button
                  variant={"outline"}
                  className={"min-w-full flex justify-between"}
                  type="button"
                >
                  {selectedHours.length > 0
                    ? `${selectedHours.length} horários selecionados`
                    : "Clique para configurar horários"}
                  <FaArrowRight className="text-zinc-400" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div>
                  <h3 className={"text-2xl font-semibold"}>
                    Horários da clínica
                  </h3>
                  <p>
                    Selecione os horários que sua clínica esta disponivel para o
                    atendimento.
                  </p>
                </div>

                <section className="space-y-2">
                  <p className="text-center  font-bold text-slate-800">
                    Clique nos horários abaixo para marcar ou desmarcar
                  </p>
                  <div className="grid grid-cols-6 gap-1">
                    {hours.map((hour) => (
                      <Button
                        variant="outline"
                        key={hour}
                        onClick={() => toggleHours(hour)}
                        className={cn(
                          "font-bold text-slate-800",
                          selectedHours.includes(hour) &&
                            "bg-teal-500 scale-[1.02] text-slate-100",
                        )}
                      >
                        {hour}
                      </Button>
                    ))}
                  </div>
                  <DialogClose asChild>
                    <Button className="px-8 bg-teal-600 hover:bg-teal-500 rounded-full w-full font-black  duration-300 transition hover:scale-[1.02] mb-3 ">
                      Salvar horários
                    </Button>
                  </DialogClose>
                </section>
              </DialogContent>
            </Dialog>
          );
        }}
      />
    </div>
  );
}
