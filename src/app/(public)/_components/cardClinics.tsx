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
import { MoveRight } from "lucide-react";
import { IoMdPin } from "react-icons/io";
import Link from "next/link";
export function CardClinics() {
  return (
    <Card className="p-0 overflow-hidden shadow-xs shadow-black/30 drop-shadow-2xl drop-shadow-black/10">
      <CardContent className="p-0 ">
        <div className="relative">
          <Image
            src={Avatar}
            alt="local clinica"
            className="object-cover max-h-50 rounded-xl"
          />
        </div>
        <section className="p-2 flex justify-between">
          <div className=" space-y-1">
            <p className="font-bold">Clinica Osvaldo</p>
            <p className="text-[10px] text-slate-600 flex items-center">
              <IoMdPin /> Rua dos bobo - Centro - São paulo - SP
            </p>
          </div>
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
        </section>
        <Link href={"/clinics/123"} className="mx-auto w-full px-2">
          <Button className="px-8 bg-teal-600 hover:bg-teal-500 rounded-full w-full font-black  duration-300 transition hover:scale-[1.02] mb-3 ">
            Agendar horário <MoveRight />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
