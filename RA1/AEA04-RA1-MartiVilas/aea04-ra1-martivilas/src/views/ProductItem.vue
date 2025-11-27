<script setup>
import { inject } from 'vue'

const addToCart = inject('addToCart')

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="product-item">
    <h4>{{ product.name }}</h4>
    <p class="category">{{ product.category }}</p>
    <p class="price">{{ product.price.toFixed(2) }} €</p>

    <button type="button" @click="addToCart(product)">
      Afegir al carret
    </button>
  </article>
</template>

<style scoped>
.product-item {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #eee;
  background-color: #fafafa;
}
.category {
  font-size: 0.85rem;
  color: #777;
}
.price {
  margin: 0.25rem 0 0.75rem;
  font-weight: 600;
}
button {
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  border: none;
  background: #3498db;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
}
button:hover {
  background: #2980b9;
}
</style>
