import prisma from "@/lib/prisma";
import { CardClinics } from "./cardClinics";

export async function Clinics() {
  const clinics = await prisma.user.findMany();

  console.log(clinics);

  return (
    <div
      id="clinics"
      className="bg-slate-200  space-y-2 rounded-2xl mx-1.5 shadow shadow-black/30 overflow-hidden"
    >
      <h2 className="text-center text-2xl md:text-3xl font-extrabold  bg-teal-600 text-slate-200 py-2  ">
        Clínicas disponíveis
      </h2>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 space-y-5 px-5 py-10   ">
        {clinics.length < 0 && <p>Nenhum clinica cadastrada no momento</p>}

        {clinics &&
          clinics.map((clinic) => (
            <CardClinics key={clinic.id} clinics={clinic} />
          ))}
      </main>
    </div>
  );
}
