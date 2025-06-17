interface BloodCard {
  id: number;
  age: number;
  donor_username: string;
  donor_profile_image: string;
  nickname: string;
  gender: "M" | "F";
  blood_type: string;
  introduction: string;
  created_at: string;
  region: string;
  image: string;
}

interface BloodDonerCard {
  id: string;
  age: number;
  nickname: string;
  gender: "MALE" | "FEMALE";
  blood_type: string;
  location: string;
  profile_image: string;
  createdAt: string;
}

type BloodcardDonate = {
  id: string;
  gender: "M" | "F";
  nickname: string;
  donor_profile_image?: string;
  donor_username: string;
  introduction: string;
  region: string;
  profile_image: string;
  receiver_id: number;
  image: string;
  age: number;
  created_at: string;
};

type BloodcardRequest = {
  id: number;
  image: string;
  requester_username: string;
  requester_profile_image: string;
  blood_type: string;
  receiver_id: number;
  region: string;
  reason: string;
  created_at: string;
};

export type { BloodCard, BloodDonerCard, BloodcardDonate, BloodcardRequest };
