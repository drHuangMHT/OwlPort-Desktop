<script setup>
import { onUnmounted, ref, nextTick } from "vue";
import { listen } from "@tauri-apps/api/event";
defineOptions({ name: "ListenEventListener" });

let kad_events = ref([]);
let handle1 = await listen("owlnest-kad-emit", (ev) => {
  kad_events.value.push(ev.payload);
  if (kad_events.value.length > 25) {
    kad_events.value.splice(0, 1);
  }
  nextTick(() => {
    let element = document.getElementById("kad-event-listener");
    element?.scrollTo(0, element.scrollHeight);
  });
});
onUnmounted(() => {
  handle1();
});
</script>
<template>
  <ul
    class="shadow-md rounded-md min-h-8 my-4 h-[100%] w-full overflow-auto text-autowrap"
    id="kad-event-listener"
  >
    <template v-for="event in kad_events">
      <li
        v-if="event.RoutingUpdated"
        class="bg-green-300 p-2 mx-4 my-2 rounded-md shadow-md"
      >
        <p>Peer ID: {{ event.RoutingUpdated.peer }}</p>
        <p>Addresses:</p>
        <ul>
          <li v-for="address in event.RoutingUpdated.addresses">
            {{ address }}
          </li>
        </ul>
      </li>
    </template>
  </ul>
</template>
