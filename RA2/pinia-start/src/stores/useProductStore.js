import { defineStore } from "pinia";
// import { ref, computed } from "vue";
import products from "@/data/products.json";
export const useProductStore = defineStore("product", () => {
  return products;
});
