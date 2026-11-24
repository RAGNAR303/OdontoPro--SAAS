import { getAllServices } from "../_access-data/services-data";
import { ServicesList } from "./service-list";



// const delay = (ms: number): Promise<void> => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// };

export async function ServiceContent({ userId }: { userId: string }) {
  // await delay(5000);
  const services = await getAllServices(userId);

  return (
    <div>
      <ServicesList services={services.data || []} />
    </div>
  );
}
