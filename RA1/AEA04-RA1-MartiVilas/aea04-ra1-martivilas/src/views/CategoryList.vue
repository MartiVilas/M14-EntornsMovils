<script setup>
import { inject, computed } from 'vue'
import ProductItem from './ProductItem.vue'

const products = inject('products')

const categories = computed(() => {
  const result = []

  for (const product of products.value) {
    if (!result.includes(product.category)) {
      result.push(product.category)
    }
  }

  return result
})

</script>

<template>
  <section class="category-list">
    <h2>Gadgets disponibles</h2>

    <div
      v-for="category in categories"
      :key="category"
      class="category-block"
    >
      <h3>{{ category }}</h3>
      <div class="products">
        <ProductItem
          v-for="product in products.filter((p) => p.category === category)"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.category-list h2 {
  margin-bottom: 1rem;
}
.category-block + .category-block {
  margin-top: 1.5rem;
}
.products {
  display: grid;
  gap: 1rem;
}
</style>
