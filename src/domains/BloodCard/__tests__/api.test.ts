import {
  getBloodCardDonates,
  getBloodCardRequests,
  getBloodCardDonateDetail,
  getBloodCardRequestDetail,
} from "../api";

describe("헌혈증 API", () => {
  it("헌혈증 기부 목록을 불러온다", async () => {
    const data = await getBloodCardDonates();
    expect(data).toHaveLength(1);
    expect(data[0]).toEqual({
      id: "1",
      nickname: "JohnDoe",
      age: 25,
      location: "서울특별시 영등포구",
      profile_image: "https://example.com/profile.jpg",
      createdAt: "2024-03-15T00:00:00.000Z",
    });
  });

  it("헌혈증 요청 목록을 불러온다", async () => {
    const data = await getBloodCardRequests();
    expect(data).toHaveLength(1);
    expect(data[0]).toEqual({
      id: "1",
      nickname: "민수핑",
      age: 30,
      location: "부산광역시 해운대구",
      profile_image: "https://example.com/profile.jpg",
      createdAt: "2024-02-20T00:00:00.000Z",
    });
  });

  it("헌혈증 기부 상세 정보를 불러온다", async () => {
    const data = await getBloodCardDonateDetail("1");
    expect(data).toEqual({
      id: "1",
      nickname: "JohnDoe",
      donationLocation: "영등포 헌혈의집",
      profile_image: "https://example.com/profile.jpg",
      image: "https://example.com/donation.jpg",
      introduce: "헌혈은 생명을 살리는 소중한 기부입니다.",
      createdAt: "2024-03-15T00:00:00.000Z",
      updatedAt: "2024-03-15T00:00:00.000Z",
    });
  });

  it("헌혈증 요청 상세 정보를 불러온다", async () => {
    const data = await getBloodCardRequestDetail("1");
    expect(data).toEqual({
      id: "1",
      nickname: "민수핑",
      donationLocation: "해운대 헌혈의집",
      profile_image: "https://example.com/profile.jpg",
      image: "https://example.com/request.jpg",
      introduce: "헌혈은 생명을 살리는 소중한 기부입니다.",
      story: "수혈이 필요한 상황입니다.",
      createdAt: "2024-02-20T00:00:00.000Z",
      updatedAt: "2024-02-20T00:00:00.000Z",
    });
  });
});
