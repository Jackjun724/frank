<script setup lang="ts">
import { NScrollbar, useMessage } from 'naive-ui'
import { SkinData } from '@/main/views/skin/skinTypes';
import { useSkinStore } from '@/main/store/useSkin.ts';

const message = useMessage()
const storeSkin = useSkinStore()
const { skinList, currentSkin } = defineProps<{ skinList: SkinData[], currentSkin: number }>()

// 应用符文&装备
const applySkin = async (skinId: number) => {
    const messageReactive = message.loading('皮肤数据写入中...')
    storeSkin.changeSkin(skinId).then(() => {
        messageReactive?.destroy()
        message.success('皮肤数据写入成功')
    }).catch((e) => {
        console.log('error config skin',e)
        messageReactive?.destroy()
        message.error('皮肤配置失败，或许没有皮肤')
    });
}

const getImgUrl = (skin: SkinData) => {
    const imageSuffix = skin.tilePath.replace('/lol-game-data/assets', '').toLowerCase();
    return `https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/${imageSuffix}`
}
</script>
<template>
    <n-scrollbar style="height: 442px;padding-right: 1px;">
        <div class="grid grid-cols-2 gap-4 p-2">
            <div v-for="skin in skinList" class="flex justify-center">
                <div class="relative group hover:scale-105 transition-transform">
                    <img 
                        :src="getImgUrl(skin)" 
                        :class="['skin-img cursor-pointer',
                                {'selected-skin': skin.id === currentSkin,
                                'unselected-skin': skin.id !== currentSkin}]"
                        @click="applySkin(skin.id)"
                    >
                    <div v-if="skin.id === currentSkin" 
                         class="absolute top-0 left-0 bg-green-500 text-white px-2 py-0.5 text-xs rounded-tl-lg rounded-br-lg">
                        已选择
                    </div>
                </div>
            </div>
        </div>
    </n-scrollbar>
</template>

<style scoped>
.skin-img {
    width: 120px;
    height: 120px;
    border-radius: 12px;
    object-fit: cover;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.skin-img:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.selected-skin {
    border: 2px solid #22c55e;
}

.unselected-skin {
    border: 2px solid transparent;
}
</style>
