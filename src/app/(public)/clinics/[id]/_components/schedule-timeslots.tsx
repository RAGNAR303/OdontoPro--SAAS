"use client";

import { Button } from "@/components/ui/button";
import { TimeSlots } from "./schedule-content";
import { cn } from "@/lib/utils";
import {
  isSlotInThePast,
  isToday,
  isSlotSequenceAvailable,
} from "./schedule.utlis";

interface ScheduleTimeSlotsProps {
  selectedDate: Date;
  selectedTime: string;
  requiredSlots: number;
  blockedTimes: string[];
  availableTimesSlots: TimeSlots[];
  clinicsTimes: string[];
  onTimeSelected: (time: string) => void;
}

export function ScheduleTimeSlots({
  availableTimesSlots,
  blockedTimes,
  requiredSlots,
  clinicsTimes,
  selectedDate,
  selectedTime,
  onTimeSelected,
}: ScheduleTimeSlotsProps) {
  console.log(blockedTimes);

  const dateIsToday = isToday(selectedDate);
  console.log(dateIsToday);

  return (
    <div className="grid grid-cols-5 md:grid-cols-7 gap-1 p-2 bg-slate-200 rounded-md">
      {availableTimesSlots.map((slot) => {
        const sequenceOk = isSlotSequenceAvailable(
          slot.time,
          requiredSlots,
          clinicsTimes,
          blockedTimes,
        );

        const slotIsPast = dateIsToday && isSlotInThePast(slot.time);
        const slotEnabled = slot.available && sequenceOk && !slotIsPast;

        return (
          <Button
            disabled={!slotEnabled}
            type="button"
            variant={"outline"}
            key={slot.time}
            onClick={() => slotEnabled && onTimeSelected(slot.time)}
            className={cn(
              "select-none",
              selectedTime === slot.time &&
                "bg-teal-600 scale-[1.02] text-slate-100",
              !slotEnabled &&
                "opacity-50 cursor-not-allowed bg-slate-600 text-slate-100",
            )}
          >
            {slot.time}
          </Button>
        );
      })}
    </div>
  );
}
