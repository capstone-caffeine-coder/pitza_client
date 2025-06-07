type Gender = "M" | "F";
type BloodType = (typeof BLOOOD_TYPES)[number];
type Region = (typeof REGIONS)[number];
type Age = (typeof AGE)[number];

const BLOOOD_TYPES = [
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
] as const;

const AGE = ["10", "20", "30", "40", "50", "60"] as const;

const REGIONS = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원특별자치도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
] as const;

export type { Age, Region, BloodType, Gender };
export { AGE, REGIONS, BLOOOD_TYPES };
