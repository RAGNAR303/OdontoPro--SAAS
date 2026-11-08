import { getTimesAppoitments } from "../../_access-data/get-times";
import { AppoitmentsList } from "./appoitments-list";

export async function Appoitments({ userId }: { userId: string }) {
  const { times, userId: id } = await getTimesAppoitments({ userId });

  return (
    <div>
      <AppoitmentsList times={times} />
    </div>
  );
}
