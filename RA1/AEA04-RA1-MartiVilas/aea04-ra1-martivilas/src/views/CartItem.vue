<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="cart-item">
    <span class="name">{{ item.name }}</span>
    <span class="price">{{ item.price.toFixed(2) }} €</span>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f2f2f2;
}
.cart-item:last-child {
  border-bottom: none;
}
.name {
  flex: 1;
}
.price {
  min-width: 80px;
  text-align: right;
}
</style>
