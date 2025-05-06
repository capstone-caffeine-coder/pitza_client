const assets = [
  "characterIcon",
  "kakao_login",
  404,
  "error",
  "pitza_spinner",
] as const;

type Assets = (typeof assets)[number];
const ASSET_PREFIX = "/src/assets";
const assetMap: Record<Assets, string> = {
  characterIcon: `${ASSET_PREFIX}/pitza.png`,
  pitza_spinner: `${ASSET_PREFIX}/pitza_spinner.png`,
  kakao_login: `${ASSET_PREFIX}/kakao_login.png`,
  404: `${ASSET_PREFIX}/404.png`,
  error: `${ASSET_PREFIX}/error.png`,
};

export { assetMap };
