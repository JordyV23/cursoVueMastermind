<template>
  <div class="alert" v-if="show" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <div class="close-alert" @click="close">&times;</div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  message: {
    required: true,
    type: String,
  },
  variant: {
    required: false,
    default: "success",
    validator(value) {
      const options = ["danger", "warning", "info", "success", "secondary"];

      return options.includes(value);
    },
  },
  show: {
    required: true,
    type: Boolean,
  },
});

const emit = defineEmits(["close"]);

const backgroundColor = computed(() => {
  const options = {
    danger: "var(--danger-color)",
    info: "var(--info-color)",
    warning: "var(--warning-color)",
    success: "var(--accent-color)",
    secondary: "var(--secondary-color)",
  };

  return options[props.variant];
});

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
