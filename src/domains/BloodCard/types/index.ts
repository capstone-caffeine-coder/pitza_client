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

type BloodcardDonate = {
  id: string;
  nickname: string;
  donationDate: string;
  donationLocation: string;
  profile_image: string;
  image: string;
  introduce: string;
  createdAt: string;
  updatedAt: string;
};

type BloodcardRequest = {
  id: string;
  nickname: string;
  donationLocation: string;
  profile_image: string;
  image: string;
  introduce: string;
  story: string;
  createdAt: string; // ISO 8601 날짜 문자열
  updatedAt: string; // ISO 8601 날짜 문자열
};

export type { BloodCard, BloodDonerCard, BloodcardDonate, BloodcardRequest };
