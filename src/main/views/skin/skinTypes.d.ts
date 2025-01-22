export interface SkinData {
  id: number
  contentId: string
  isBase: boolean
  name: string
  splashPath: string
  uncenteredSplashPath: string
  tilePath: string
  loadScreenPath: string
  skinType: string
  rarity: string
  isLegacy: boolean
  splashVideoPath: string | null
  collectionSplashVideoPath: string | null
  collectionCardHoverVideoPath: string | null
  featuresText: string | null
  chromaPath: string | null
  emblems: any | null
  regionRarityId: number
  rarityGemPath: string | null
  skinLines: any | null
  description: string | null
}

export interface SkinStoreState {
  currentChamp: number
  currentSkin: number
  skinDataList: SkinData[]
}

export interface SkinStoreActions {
  changeSkin(skinId: number): Promise<any>
  initSkin(champId: number): Promise<any>
}