<script setup>
defineProps({
  type: { type: String, default: 'primary' },
  size: { type: String, default: 'medium' },
})
</script>

<template>
  <button class="my-btn" :class="[`my-btn--${type}`, `my-btn--${size}`]">
    <slot />
  </button>
</template>

<style scoped>
.my-btn {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.15s;
}
.my-btn:hover {
  opacity: 0.85;
}
.my-btn--primary {
  background: #1976d2;
  color: #fff;
}
.my-btn--danger {
  background: #d32f2f;
  color: #fff;
}
.my-btn--ghost {
  background: transparent;
  color: #1976d2;
  border: 1px solid #1976d2;
}
.my-btn--small {
  padding: 4px 10px;
  font-size: 12px;
}
.my-btn--medium {
  padding: 6px 14px;
  font-size: 14px;
}
.my-btn--large {
  padding: 10px 18px;
  font-size: 16px;
}
</style>
