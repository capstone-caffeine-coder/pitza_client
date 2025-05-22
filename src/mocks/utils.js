/**
 * @typedef {Object} Sendmessage
 * @property {string} roomId - 방 아이디
 * @property {string} sender - 메시지 보낸 사람
 * @property {string} content - 메시지 내용
 * @property {WebSocket} client - 소켓 클라이언트
 * @property {() => boolean} isRoomOpen - 소켓 연결 상태 반환 함수
 *
 * @param {Sendmessage} param
 * @returns {() => void} clear 함수 반환
 */
const sendIntervalMessage = ({
  roomId,
  sender,
  content,
  client,
  isRoomOpen,
}) => {
  const payload = {
    roomId,
    sender,
    content,
    sent_at: new Date().toISOString(),
  };

  const timer = setInterval(() => {
    if (!isRoomOpen()) {
      clearInterval(timer);
      return;
    }
    client.emit("message", payload);
  }, 5000);

  setTimeout(() => {
    console.log("Interval message 끄기");
    clearInterval(timer);
  }, 15000);

  return () => clearInterval(timer); // 중단용 함수 반환
};

export { sendIntervalMessage };
