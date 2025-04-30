const assets = ["characterIcon", "kakao_login"] as const;

type Assets = (typeof assets)[number];
const ASSET_PREFIX = "/src/assets/";
const assetMap: Record<Assets, string> = {
  characterIcon: `${ASSET_PREFIX}pitza.png`,
  kakao_login: `${ASSET_PREFIX}kakao_login.png`,
};

export { assetMap };
