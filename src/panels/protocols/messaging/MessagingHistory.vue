<script setup>
import { ref, onActivated, onDeactivated, computed, onMounted } from "vue";
const props = defineProps({
  history: Array,
  remote: String,
  local: String,
});
let show_scroll_bottom = ref(false);
defineEmits(["update:history"]);

const history = computed({
  get() {
    return props.history;
  },
  set(value) {
    emit("update:history", value);
  },
});

onDeactivated(() => {
  removeEventListener("wheel", show_scroll_to_bottom);
});
onActivated(() => {
  addEventListener("wheel", show_scroll_to_bottom);
  scroll_to_bottom()
});
function show_scroll_to_bottom(ev) {
  let element = document.getElementById(`chat-history`);
  if (element.scrollHeight - element.scrollTop - 350 < 200) {
    show_scroll_bottom.value = false;
  } else {
    show_scroll_bottom.value = true;
  }
}
function scroll_to_bottom() {
  let latest = document.querySelector("#chat-history > li:last-child");
  if (latest) {
    latest.scrollIntoView();
  } else {
    let wrapper = document.getElementById(`chat-history`);
    wrapper.scroll(0, wrapper.scrollHeight);
  }
  show_scroll_bottom.value = false;
}
</script>

<template>
  <section class="w-full h-full relative">
    <ul class="flex flex-col h-full px-4 py-2 overflow-auto gutter" id="chat-history">
      <template v-for="message in history">
        <li
          v-if="message.from === props.remote"
          class="message-box bg-gray-300 self-start whitespace-pre-wrap"
        >
          {{ message.msg }}
        </li>
        <li
          v-else
          class="message-box bg-green-300 self-end whitespace-pre-wrap"
        >
          {{ message.msg }}
        </li>
      </template>
    </ul>
    <button
      v-if="show_scroll_bottom"
      class="absolute bottom-0 right-4 bg-transparent shadow-none border-none"
      @click="scroll_to_bottom"
    >
      <span class="material-icons"> arrow_downward </span>
    </button>
  </section>
</template>
<style>
.message-box {
  padding: 0.25rem;
  border-radius: 0.25rem;
  border: 1px solid black;
  width: max-content;
  max-width: 65%;
  min-height: 2rem;
  margin: 0.25rem 0px;
}
</style>
