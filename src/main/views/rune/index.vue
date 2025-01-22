<script setup lang="ts">
import RuneHeader from "./runeHeader.vue";
import RuneMain from "./runeMain.vue";
import {RuneStoreActions, RuneStoreState} from "@/main/views/rune/runeTypes";
import {SkinStoreActions, SkinStoreState} from "@/main/views/skin/skinTypes";
import {Store} from "pinia";
import {useRuneStore} from "@/main/store/useRune.ts";
import {useSkinStore} from "@/main/store/useSkin.ts";

const storeRune: Store<"useRuneStore", RuneStoreState, {}, RuneStoreActions> = useRuneStore()
const storeSkin: Store<"useSkinStore", SkinStoreState, {}, SkinStoreActions> = useSkinStore()

</script>

<template>
  <div class="mainContent">
    <rune-header :store-rune="storeRune" />
    <rune-main :store-rune="storeRune" :store-skin="storeSkin" />
  </div>
</template>
