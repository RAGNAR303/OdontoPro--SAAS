import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { PlansCard } from "./_components/plan-card";
import { Suspense } from "react";
import { getSubscription } from "@/utils/Plans/_access-data/get-subscription";
export default async function Plans() {
  const session = await getSession();

  if (!session?.user.id) {
    redirect("/");
  }

  const subscription = await getSubscription({ userId: session?.user.id! });

  console.log(subscription);

  return (
    <div>
      {subscription?.status !== "active" && <PlansCard />}

      {subscription?.status === "active" && <p>Plano ativado com sucesso</p>}
    </div>
  );
}
