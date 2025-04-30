interface BloodCard {
  id: string;
  age: number;
  nickname: string;
  sex: "MALE" | "FEMALE";
  bloodType: string;
  location: string;
  profile_image: string;
  donationDate: string;
  donationLocation: string;
  createdAt: string;
  updatedAt: string;
}

interface BloodDonerCard {
  id: string;
  age: number;
  nickname: string;
  sex: "MALE" | "FEMALE";
  bloodType: string;
  location: string;
  profile_image: string;
  createdAt: string;
}

export type { BloodCard, BloodDonerCard };
