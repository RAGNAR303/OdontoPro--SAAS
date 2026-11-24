import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PLANS, subscriptionPlans } from "@/utils/Plans/plans";
import { cn } from "cn";
import { MoveRight } from "lucide-react";

export function PlansCard() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {subscriptionPlans.map((plan, index) => (
        <div
          key={plan.id}
          className="flex flex-col  justify-center relative mt-4"
        >
          {index === 1 && (
            <div className="bg-teal-600 text-center p-2 rounded-t-2xl absolute -top-7 w-full">
              <p className="text-white font-bold animate-pulse ">
                PROMOÇÃO EXCLUSIVA
              </p>
            </div>
          )}
          <Card
            className={`pt-0 shadow-xl ${index === 1 && "border-teal-600 border"}`}
          >
            <CardHeader
              className={cn("bg-slate-800 py-3", {
                "bg-teal-600": index === 1,
              })}
            >
              <CardTitle className="text-slate-50 text-2xl font-extrabold">
                {plan.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="ml-4">
              <CardDescription className=" text-slate-800 font-bold">
                {plan.description}
              </CardDescription>
              <ul className="space-y-2 text-slate-700">
                {plan.features.map((feature, index) => (
                  <li className="list-disc" key={index}>
                    {feature}
                  </li>
                ))}
              </ul>
              <div>
                <p className="line-through text-slate-500 text-xl">
                  {plan.oldPrice}
                </p>
                <strong className="text-slate-900 text-2xl">
                  {plan.price}/mês
                </strong>
              </div>
              <Button
                className={cn(
                  "px-8  rounded-full w-full font-black  duration-300 transition hover:scale-[1.02] mb-3 ",
                  {
                    "bg-teal-600 hover:bg-teal-500": index === 1,
                    "bg-slate-600 hover:bg-slate-500": index === 0,
                  },
                )}
              >
                ATIVAR ASSINATURA
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
    </section>
  );
}
