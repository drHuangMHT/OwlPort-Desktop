<script setup lang="ts">
import { invoke } from "@tauri-apps/api/core";
import KadEventListener from "./KadEventListener.vue";

</script>
<template>
  <section class="flex py-2 px-12 border-b item-evenly-sized">
    <button class="py-2 w-16" @click="() => invoke('plugin:owlnest-kad|insert_default')">
      Insert default nodes
    </button>
    <button @click="() => invoke('plugin:owlnest-kad|bootstrap')">
      Bootstrap
    </button>
  </section>
  <section class="" style="height: calc(100vh - 7rem - 3px)">
    <Suspense>
      <KadEventListener />
    </Suspense>
  </section>
</template>
