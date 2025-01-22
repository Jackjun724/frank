import { defineStore } from "pinia";
import { SkinStoreState, SkinStoreActions } from "@/main/views/skin/skinTypes";
import { QuerySkin } from "@/main/views/skin/querySkin";
import { invoke } from '@tauri-apps/api/core';
import { ConfigSettingTypes } from "@/background/types";
import { useMessage } from "naive-ui";

const querySkin = new QuerySkin()
const message = useMessage()

export const useSkinStore = defineStore<'useSkinStore', SkinStoreState, {}, SkinStoreActions>('useSkinStore', {
    state: () => ({
        currentChamp: 0,
        currentSkin: 0,
        skinDataList: []
    }),
    actions: {
        async changeSkin(skinId: number): Promise<any> {
            await invoke('reset_skin')
            if (skinId !== 0 && skinId !== this.skinDataList[0].id) {
                const config: ConfigSettingTypes = JSON.parse(<string>(localStorage.getItem('configSetting')))
                if(config.gamePath){
                    await invoke('unzip_skin', { srcZip: `lol-skins-developer/${this.currentChamp}/${skinId % 1000}.fantome`, gamePath: config.gamePath })
                }else{
                    message.error('请先设置游戏目录')
                    return;
                }
            }
            this.currentSkin = skinId
            localStorage.setItem(`Skin_${this.currentChamp}`, skinId.toString())
        },
        async initSkin(champId: number) {

            this.currentChamp = champId
            const skinData = await querySkin.getSkinsInfo(champId)
            this.skinDataList = skinData
            const id = parseInt(localStorage.getItem(`Skin_${champId}`) || '0')
            let nowSkinId = 0
            if (id) {
                nowSkinId = Number(id)
            } else {
                nowSkinId = skinData[0].id
            }
            this.changeSkin(nowSkinId)
            return skinData.length === 0
        }
    }
})