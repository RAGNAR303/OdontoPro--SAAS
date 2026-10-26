import { getAllServices } from "../_access-data/services-data";
import { ServicesList } from "./service-list";

export async function ServiceContent({ userId }: { userId: string }) {
  const services = await getAllServices(userId);

  return (
    <div>
      <ServicesList services={services.data || []} />
    </div>
  );
}
