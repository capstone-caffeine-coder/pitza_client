import axios from "axios";

interface BloodStatus {
  A: number;
  B: number;
  AB: number;
  O: number;
  total: number;
  leftDays: number;
}
async function getBloodStatus(): Promise<BloodStatus> {
  const { data } = await axios.get(
    "https://asia-northeast3-caffeinecoder.cloudfunctions.net/getBloodHoldStatus ",
  );
  return data;
}

export type { BloodStatus };
export { getBloodStatus };
