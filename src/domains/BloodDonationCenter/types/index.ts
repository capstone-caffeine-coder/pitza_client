interface BloodDonationCenter {
  id: number;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  tel: string;
  center_image_url: string;
}

export type { BloodDonationCenter };
