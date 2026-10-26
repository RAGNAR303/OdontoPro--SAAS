import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { dataProfile } from "./_access-data/access-data";
import { ProfileContent } from "./_components/profile";

export default async function Profile() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  const user = await dataProfile({ userID: session.user?.id });

  if (!user) {
    redirect("/");
  }

  return <ProfileContent user={user} />;
}
