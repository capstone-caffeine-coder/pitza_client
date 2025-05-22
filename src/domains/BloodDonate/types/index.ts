import { Age, BloodType, Gender, Region } from "@/src/types/donationInfo";

interface MatchRequest {
  blood_type: BloodType;
  age: Age;
  gender: Gender;
  location: Region;
  next_donation_date: string;
}

interface CreateDonation {
  bloodType: BloodType;
  age: number;
  gender: Gender;
  location: Region;
  deadline: Date;
  story: string;
  image?: File;
  doncationId: string;
}

export type { MatchRequest, CreateDonation };
