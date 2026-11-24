import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { dataProfile } from "./_access-data/access-data";
import { ProfileContent } from "./_components/profile-content";
import { Suspense } from "react";

export default async function Profile() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  const user = await dataProfile({ userID: session.user?.id });

  if (!user) {
    redirect("/");
  }

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProfileContent user={user} />
    </Suspense>
  );
}
