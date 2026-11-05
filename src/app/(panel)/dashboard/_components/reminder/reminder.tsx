import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { getReminder } from "../../_access-data/get-reminder";
import { ReminderCreate } from "./reminder-create";
import { ReminderList } from "./reminder-list";

export async function Reminder({ userId }: { userId: string }) {
  const reminder = await getReminder({ userId });

  return (
    <Card className="p-0">
      <CardFooter className="flex items-center justify-between py-0 bg-teal-600 w-full rounded-none ">
        <CardTitle className="font-bold text-xl  px-4 py-2 text-white">
          Lembretes
        </CardTitle>
        <ReminderCreate />
      </CardFooter>
      <section>
        <ReminderList reminder={reminder} />
      </section>
    </Card>
  );
}
