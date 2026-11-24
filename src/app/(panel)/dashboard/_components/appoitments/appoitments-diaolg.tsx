import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppoitmentWithService } from "./appoitments-list";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/formatCurrency";

type AppoitmentDiaolgProps = {
  appoitment: AppoitmentWithService | null;
};

export function AppoitmentDiaolg({ appoitment }: AppoitmentDiaolgProps) {
  console.log(appoitment);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-extrabold text-slate-800 sm:text-2xl">
          Detalhes do agendamento
        </DialogTitle>
        <DialogDescription className="text-slate-600">
          Veja todos os detalhes do agendamento
        </DialogDescription>
      </DialogHeader>

      {appoitment && (
        <article>
          <p className="text-slate-800 font-bold">
            Data do agendamento:{" "}
            <span className="text-slate-600">
              {new Intl.DateTimeFormat("pt-BR", {
                timeZone: "UTC",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date(appoitment.appointmentDate))}
            </span>
          </p>
          <p className="text-slate-800 font-bold mb-3">
            Hora do agendamento:{" "}
            <span className="text-slate-600">{appoitment.time}</span>
          </p>
          <h3 className="text-slate-800 font-black mb-2">
            Informações do Cliente
          </h3>
          <p className="text-slate-800 font-bold">
            Nome: <span className="text-slate-600">{appoitment.name}</span>
          </p>
          <p className="text-slate-800 font-bold">
            Email: <span className="text-slate-600">{appoitment.email}</span>
          </p>
          <p className="text-slate-800 font-bold">
            Telefone:<span className="text-slate-600">{appoitment.phone}</span>
          </p>

          <div className="mt-3 bg-teal-600 p-2 rounded-xl">
            <p className="text-slate-800 font-bold">
              Serviço:
              <span className="text-white">{appoitment.service?.name}</span>
            </p>
            <p className="text-slate-800 font-bold">
              Preço:
              <span className="text-white">
                {formatCurrency(appoitment.service?.price! / 100)}
              </span>
            </p>
            <p className="text-slate-800 font-bold">
              Duração:
              <span className="text-white">
                {appoitment.service?.duration} Min
              </span>
            </p>
          </div>
        </article>
      )}
    </DialogContent>
  );
}
