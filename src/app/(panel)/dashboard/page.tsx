import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TbCalendarPlus } from "react-icons/tb";
import { CopyLinkButton } from "./_components/copy-link-button";
import { Reminder } from "./_components/reminder/reminder";
export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="flex flex-col">
      <div className="self-end space-x-2">
        <Link href={`/clinics/${session.user.id}`} target="_blank">
          <Button
            className={
              "px-8 bg-teal-600 hover:bg-teal-500 font-black  duration-300 transition hover:scale-[1.02] mt-3"
            }
          >
            <TbCalendarPlus className="w-10 h-10" /> Novo agendamento
          </Button>
        </Link>
        <CopyLinkButton userId={session.user.id} />
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 mt-5">
        <h1>Agenda</h1>
        <Reminder userId={session.user.id} />
      </section>
    </main>
  );
}
