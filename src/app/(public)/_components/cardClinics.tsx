import { Button } from "../../../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Image from "next/image";
import Avatar from "../../../../public/foto1.png";
import { IoMdPin } from "react-icons/io";
import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";
import { cn } from "cn";
import { MoveRight } from "lucide-react";

type ClinicsDataInfo = Prisma.UserGetPayload<{}>;

interface CardClinicsProps {
  clinics: ClinicsDataInfo | null;
}

export function CardClinics({ clinics }: CardClinicsProps) {
  console.log(clinics);
  return (
    <Card className="p-0 overflow-hidden shadow-xs shadow-black/30 drop-shadow-2xl drop-shadow-black/10 hover:shadow-xl duration-300 ">
      <CardContent className="p-0 ">
        <div className="relative  h-52 md:h-40 ">
          <Image
            src={clinics?.image ?? Avatar}
            alt="local clinica"
            className="object-cover max-h-50 rounded-xl"
            fill
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <section className="p-2 flex justify-between">
          <div className=" space-y-1">
            <p className="font-bold">{clinics?.name}</p>
            <p className="text-[10px] text-slate-600 flex items-center">
              <IoMdPin /> {clinics?.address ?? "Endereço não imformado"}
            </p>
          </div>
          <div
            className={cn(
              "w-2.5 h-2.5 rounded-full",
              clinics?.status === true ? " bg-green-500 " : "bg-red-500 ",
            )}
          ></div>
        </section>
        <Link href={`/clinics/${clinics?.id}`} className="mx-auto w-full px-2">
          <Button className="px-8 bg-teal-600 hover:bg-teal-500 rounded-full w-full font-black  duration-300 transition hover:scale-[1.02] mb-3 ">
             Agendar horário <MoveRight />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
