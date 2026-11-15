"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Reminder } from "@/generated/prisma/client";
import { TbTrashXFilled } from "react-icons/tb";
import { deleteReminder } from "../../_actions/delete-reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReminderListProps {
  reminder: Reminder[];
}

export function ReminderList({ reminder }: ReminderListProps) {
  const router = useRouter();
  async function handleDeleteReminder(reminderId: string) {
    const response = await deleteReminder({ reminderId });

    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.warning(response.data);
    router.refresh();
  }

  return (
    <div className="px-2">
      {reminder.length === 0 && (
        <p className="text-slate-600 font-bold">
          Nenhum lembrete registrado...
        </p>
      )}
      <ScrollArea className={"w-full h-72 px-1"}>
        {reminder.map((item) => (
          <article
            key={item.id}
            className="flex items-center justify-between p-1 rounded shadow-2xs shadow-black/30 bg-amber-100/50 mt-4 relative pt-5 "
          >
            <p className="text-slate-800 font-semibold"> {item.description}</p>
            <Button
              variant={"ghost"}
              size={"icon-xs"}
              onClick={() => handleDeleteReminder(item.id)}
              className={
                "  bg-red-300 hover:bg-red-500    absolute  -top-3 right-0 rounded-full duration-300 "
              }
            >
              <TbTrashXFilled />
            </Button>
          </article>
        ))}
      </ScrollArea>
    </div>
  );
}
