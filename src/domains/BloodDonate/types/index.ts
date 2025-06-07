import { Age, BloodType, Gender, Region } from "@/src/types/donationInfo";

interface MatchRequest {
  id: number;
  blood_type: BloodType;
  age: Age;
  sex: Gender;
  location: Region;
  next_donation_date: Date;
}

interface CreateDonation {
  requester: number;
  name: string;
  blood_type: BloodType;
  age: number;
  sex: Gender;
  location: Region;
  content: string;
  image?: File;
  donation_due_date: Date;
  donator_registered_id: string;
}

export type { MatchRequest, CreateDonation };
