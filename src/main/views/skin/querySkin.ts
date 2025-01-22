import { requestFetch } from "@/main/utils/request"
import { SkinData } from "./skinTypes"

export class QuerySkin {

    // 获取英雄皮肤数据
    public getSkinsInfo = async (champId: number): Promise<SkinData[]> => {
        const baseUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/${champId}.json`
        const res = await requestFetch<any>(`${baseUrl}`, 'GET')
        return res?.skins ?? []
    }

}