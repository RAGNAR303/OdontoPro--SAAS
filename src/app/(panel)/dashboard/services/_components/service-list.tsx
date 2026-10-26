"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImPlus } from "react-icons/im";
import { useState } from "react";
import { ServiceForm } from "./dialog-content";
import { Service } from "@/generated/prisma/client";
import {
  TbEditFilled,
  TbTrashXFilled,
  TbClockFilled,
  TbReportMoneyFilled,
} from "react-icons/tb";
import { formatCurrency } from "@/utils/formatCurrency";
import { deleteService } from "../_actions/delete-service";
import { toast } from "sonner";
interface ServicesListProps {
  services: Service[];
}

export function ServicesList({ services }: ServicesListProps) {
  const [editService, setEditService] = useState<null | Service>(null);
  const [openDialog, setOpenDialog] = useState(false);

  async function handleDeleteService(serviceID: string) {
    const response = await deleteService({ id: serviceID });

    if (response.error) {
      toast.error(response.error);
    }

    toast.success(response.data);
  }

  async function handleEditService(service: Service) {
    setEditService(service);
    setOpenDialog(true);
  }

  return (
    <Card>
      <div className="flex justify-between items-center flex-row w-full px-3">
        <CardFooter className="flex flex-col items-start">
          <CardTitle className="font-bold text-xl">Lista de serviços</CardTitle>
          <CardDescription>
            Veja a lista de serviços cadastrados ou crie um novo serviço.
          </CardDescription>
        </CardFooter>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              size={"icon-sm"}
              className=" bg-teal-600 hover:bg-teal-500 rounded-full w-fit font-black  duration-300 transition hover:scale-[1.02] p-2 "
            >
              <ImPlus className="text-3xl" />
            </Button>
          </DialogTrigger>
          <DialogContent
            onInteractOutside={(e) => {
              e.preventDefault();
              setOpenDialog(false);
              setEditService(null);
            }}
            className="rounded-2xl"
          >
            <ServiceForm
              serviceId={editService ? editService?.id : undefined}
              initialValue={
                editService
                  ? {
                      name: editService?.name,
                      price: (editService?.price / 100)
                        .toFixed(2)
                        .replace(".", ","),
                      hours: Math.floor(editService?.duration / 60).toString(),
                      minutes: (editService?.duration % 60).toString(),
                    }
                  : undefined
              }
              onCloseModal={() => {
                setOpenDialog(false);
                setEditService(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2 ">
        {services.map((item) => (
          <Card key={item.id} className="p-0">
            <CardHeader className="bg-teal-500 py-2">
              <span className="font-extrabold text-slate-50 ">{item.name}</span>
            </CardHeader>
            <CardContent className="flex items-center justify-between pb-1 flex-row  ">
              <div className="flex flex-col gap-4">
                <span className="flex items-center gap-1">
                  <TbReportMoneyFilled />
                  {formatCurrency(item.price / 100)}
                </span>
                <span className="flex items-center gap-1">
                  <TbClockFilled />
                  {item.duration} Min
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  variant={"outline"}
                  size={"icon-sm"}
                  onClick={() => handleEditService(item)}
                  className={"hover:bg-blue-300"}
                >
                  <TbEditFilled />
                </Button>
                <Button
                  variant={"outline"}
                  size={"icon-sm"}
                  onClick={() => handleDeleteService(item.id)}
                  className={"hover:bg-red-300"}
                >
                  <TbTrashXFilled />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </Card>
  );
}
