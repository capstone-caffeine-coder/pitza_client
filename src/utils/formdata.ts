function createFormData(body: Record<string, any>): FormData {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === "next_donation_date") {
        // 날짜는 YYYY-MM-DD 형식으로 변환하여 추가
        const date = new Date(value);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        formData.append(key, `${yyyy}-${mm}-${dd}`);
      } else if (value instanceof File || value instanceof Blob) {
        // 이미지 또는 파일 처리
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });
  return formData;
}

export { createFormData };
