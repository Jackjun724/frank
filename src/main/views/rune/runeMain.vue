<script setup lang="ts">
import {NTabs, NTabPane,NCard} from "naive-ui"
import RuneContent from "./runeContent.vue";
import SkinContent from "./skinContent.vue";
import BlockContent from "./blockContent.vue";
import {RuneStoreActions, RuneStoreState} from "@/main/views/rune/runeTypes";
import {SkinStoreActions, SkinStoreState} from "@/main/views/skin/skinTypes";
import {Store} from "pinia";

const {storeRune, storeSkin} = defineProps<{
  storeRune: Store<"useRuneStore", RuneStoreState, {}, RuneStoreActions>,
  storeSkin: Store<"useSkinStore", SkinStoreState, {}, SkinStoreActions>
}>()
</script>

<template>
  <n-card class="shadow" size="small"
          content-style="padding-top:2px;" style="height: 517px;">
    <n-tabs class="mt-2.5" type="segment" animated justify-content="space-between">
      <n-tab-pane name="tab1" tab="推荐符文">
        <rune-content :rune-list="storeRune.runeDataList"/>
      </n-tab-pane>
      <n-tab-pane name="tab2" tab="皮肤选择">
        <skin-content :skin-list="storeSkin.skinDataList" :current-skin="storeSkin.currentSkin"/>
      </n-tab-pane>
      <n-tab-pane name="tab3" tab="配装方案">
        <block-content/>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
