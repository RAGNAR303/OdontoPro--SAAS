"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TbClockFilled,
  TbEditFilled,
  TbInfoSquareRoundedFilled,
  TbPhoneFilled,
} from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Prisma } from "@/generated/prisma/client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "cn";
import { deleteAppoitments } from "../../_actions/delete-appoitments";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AppoitmentDiaolg } from "./appoitments-diaolg";
import { useState } from "react";

export type AppoitmentWithService = Prisma.AppointmentGetPayload<{
  include: {
    service: true;
  };
}>;

export function AppoitmentsList({ times }: { times: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const clientQuery = useQueryClient();
  const [open, setOpen] = useState(false);
  const [appotimentDetail, setAppotimentDetail] =
    useState<AppoitmentWithService | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-appointments", date],
    queryFn: async () => {
      let activeDate = date;

      if (!activeDate) {
        const today = format(new Date(), "yyyy-MM-dd");
        activeDate = today;
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`;

      const response = await fetch(url);

      const json = (await response.json()) as AppoitmentWithService[];

      if (!response.ok) {
        return [];
      }

      return json;
    },
    staleTime: 20000, // 20 segundos
    refetchInterval: 30000,
  });

  //  Montar occupantMap slot > appointment
  // Se um Appointment começa no time (15:00) e tem requiredSlots 2
  // occupantMap ["15:00" , appoitment] occupantMap ["15:30" , appoitment]
  const occupantMap: Record<string, AppoitmentWithService> = {};

  if (data && data.length > 0) {
    for (const appointment of data) {
      const requeredSlots = Math.ceil(appointment.service?.duration! / 30);

      const startIndex = times.indexOf(appointment.time);

      if (startIndex !== -1) {
        for (let i = 0; i < requeredSlots; i++) {
          const slotIndex = startIndex + i;
          if (slotIndex < times.length) {
            occupantMap[times[slotIndex]] = appointment;
          }
        }
      }
    }
  }

  async function handleDeleteAppointments(appoitmentsId: string) {
    if (!appoitmentsId) {
      toast.warning("O ID do agendamento não foi informado");
      return;
    }

    const response = await deleteAppoitments({ appoitmentsId });

    if (!response.data) {
      toast.error(response.error);
      return;
    }
    clientQuery.invalidateQueries({ queryKey: ["get-appointments", date] });
    refetch();
    toast.success(response.data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card className="p-0 bg-slate-200">
        <CardHeader className="flex items-center justify-between py-0 bg-teal-600 w-full rounded-none ">
          <CardTitle className="font-bold text-xl  px-4 py-2 text-white">
            Agendamentos
          </CardTitle>
          <button>Data</button>
        </CardHeader>
        <CardContent className="px-1">
          <ScrollArea className={"h-100 mb-3"}>
            {isLoading ? (
              <p className="text-center text-xl font-extrabold animate-pulse text-slate-800">
                Carregando agendamentos...
              </p>
            ) : (
              times.map((slot) => {
                const occupant = occupantMap[slot];

                if (occupant) {
                  return (
                    <article
                      key={slot}
                      className={cn(
                        " flex space-x-3 px-2 py-3 first:border-none w-full justify-between bg-amber-100/50 rounded-md",
                      )}
                    >
                      <div className="space-x-3 flex flex-row items-center ">
                        <span className="bg-teal-600 py-1 px-2 rounded-2xl  font-bold text-white">
                          {slot}
                        </span>
                        <span className={"text-slate-800 font-extrabold"}>
                          <div>
                            <p>{occupant.name}</p>
                            <p className="text-slate-700 text-[12px]">
                              {occupant.service?.name}
                            </p>
                          </div>
                        </span>
                      </div>
                      <div className="hover:bg-transparent">
                        <Button
                          variant={"ghost"}
                          size={"icon-sm"}
                          className={
                            "text-slate-800 hover:text-green-400 hover:bg-transparent"
                          }
                        >
                          <TbEditFilled />
                        </Button>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setAppotimentDetail(occupant);
                            }}
                            variant={"ghost"}
                            size={"icon-sm"}
                            className={"text-slate-800 hover:text-blue-400"}
                          >
                            <TbInfoSquareRoundedFilled />
                          </Button>
                        </DialogTrigger>

                        <Button
                          onClick={() => handleDeleteAppointments(occupant.id)}
                          variant={"ghost"}
                          size={"icon-sm"}
                          className={
                            "text-slate-800 hover:text-red-400 hover:bg-transparent"
                          }
                        >
                          <RiCloseCircleFill />
                        </Button>
                      </div>
                    </article>
                  );
                }

                return (
                  <article
                    key={slot}
                    className="border-t border-white flex space-x-3 px-2 py-3 first:border-none w-full"
                  >
                    <div className="space-x-3">
                      <span className="bg-teal-600 py-1 px-2 rounded-2xl  font-bold text-white">
                        {slot}
                      </span>
                      <span className={"text-slate-800 font-extrabold"}>
                        Disponivel
                      </span>
                    </div>
                  </article>
                );
              })
            )}
          </ScrollArea>
        </CardContent>
      </Card>
      <AppoitmentDiaolg appoitment={appotimentDetail} />
    </Dialog>
  );
}
