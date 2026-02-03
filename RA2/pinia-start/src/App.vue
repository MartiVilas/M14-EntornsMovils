<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";
import { useProductStore } from "@/stores/useProductStore";
console.log(useProductStore());
const productsStore = useProductStore();
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productsStore.products"
        :key="product.name"
        :product="product"
      />
    </ul>
  </div>
</template>
