<template>
  <div class="alert" v-if="show" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <div class="close-alert" @click="close">&times;</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  useBackgroundColor,
  backgroundColorProps,
} from "../composables/backgroundColor";

const props = defineProps({
  message: {
    required: true,
    type: String,
  },
  ...backgroundColorProps,
  show: {
    required: true,
    type: Boolean,
  },
});

const emit = defineEmits(["close"]);

const backgroundColor = useBackgroundColor(props);

function close() {
  emit("close");
}
</script>

<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0px 20px 0px 20px;
  border-radius: 10px;
  height: 50px;
}

.close-alert {
  font-size: 50px;
  cursor: pointer;
}
</style>
