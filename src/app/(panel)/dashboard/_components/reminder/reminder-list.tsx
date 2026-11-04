"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Reminder } from "@/generated/prisma/client";
import { TbTrashXFilled } from "react-icons/tb";

interface ReminderListProps {
  reminder: Reminder[];
}

export function ReminderList({ reminder }: ReminderListProps) {
  console.log(reminder);
  return (
    <ScrollArea className={"w-full h-100 "}>
      <div className="flex flex-col gap-2 px-1 ">
        {reminder.map((item) => (
          <article
            key={item.id}
            className="flex items-center justify-between p-1 rounded shadow-2xs shadow-black/15 bg-amber-100/50"
          >
            <p> {item.description}</p>
            <Button
              variant={"outline"}
              size={"icon-sm"}
              onClick={() => {}}
              className={"hover:bg-red-300"}
            >
              <TbTrashXFilled />
            </Button>
          </article>
        ))}
      </div>
    </ScrollArea>
  );
}
