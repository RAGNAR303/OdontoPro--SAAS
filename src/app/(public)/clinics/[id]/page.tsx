import { getAllInfoClinic } from "./_access-data/get-info-clinic";
import { redirect } from "next/navigation";
import { ScheduleContent } from "./_components/schedule-content";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const user = await getAllInfoClinic({ userId: userId });

  if (!user) {
    redirect("/");
  }

  return <ScheduleContent clinic={user} />;
}
