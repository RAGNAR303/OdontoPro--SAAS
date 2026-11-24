import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TbCalendarPlus } from "react-icons/tb";
import { CopyLinkButton } from "./_components/copy-link-button";
import { Reminder } from "./_components/reminder/reminder";
import { Appoitments } from "./_components/appoitments/appoitments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoCalendar } from "react-icons/io5";
import { BiSolidCommentDetail } from "react-icons/bi";
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
              "px-8 bg-teal-600 hover:bg-teal-500 font-black rounded-full duration-300 transition hover:scale-[1.02] mt-3"
            }
          >
            <TbCalendarPlus className="w-10 h-10" /> Novo agendamento
          </Button>
        </Link>
        <CopyLinkButton userId={session.user.id} />
      </div>
      <section className="hidden lg:grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5">
        <Appoitments userId={session.user.id} />
        <Reminder userId={session.user.id} />
      </section>
      <Tabs className="flex lg:hidden mt-10  " defaultValue="appoitment">
        <TabsList className=" bg-teal-600 ">
          <TabsTrigger value="appoitment">
            <div className="text-slate-800 flex items-center gap-2">
              <IoCalendar />
              Agendamentos
            </div>
          </TabsTrigger>
          <TabsTrigger value="reminder">
            <div className="text-slate-800 flex items-center gap-2">
              <BiSolidCommentDetail />
              Lembretes
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="appoitment">
          <Appoitments userId={session.user.id} />
        </TabsContent>
        <TabsContent value="reminder">
          <Reminder userId={session.user.id} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
