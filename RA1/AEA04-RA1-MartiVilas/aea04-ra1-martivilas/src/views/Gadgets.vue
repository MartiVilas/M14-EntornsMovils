<script setup>
import { ref, computed, provide } from 'vue'
import CategoryList from '@/views/CategoryList.vue'
import Cart from '@/views/Cart.vue'

const products = ref([
  { id: 1, name: 'Auriculars inalàmbrics', category: 'Àudio', price: 79.99 },
  { id: 2, name: 'Teclat mecànic RGB', category: 'Perifèrics', price: 99.99 },
  { id: 3, name: 'Smartwatch esportiu', category: 'Wearables', price: 129.9 },
  { id: 4, name: 'Ratolí gaming', category: 'Perifèrics', price: 49.5 },
  { id: 5, name: 'Altaveu Bluetooth', category: 'Àudio', price: 59.0 },
])

const cart = ref([])

function addToCart(product) {
  cart.value.push({ ...product })
}

function clearCart() {
  cart.value = []
}


const totalItems = computed(() => cart.value.length)

const totalPrice = computed(() =>
  cart.value.reduce((total, item) => total + item.price, 0),
)


provide('products', products)
provide('addToCart', addToCart)
provide('cart', cart)
provide('clearCart', clearCart)
provide('totalItems', totalItems)
provide('totalPrice', totalPrice)
</script>

<template>
  <section class="gadgets">
    <h1>Botiga de Gadgets</h1>
    <p>Afegeix gadgets tecnològics al carret i mira el total en temps real.</p>

    <div class="gadgets-layout">
      <CategoryList />
      <Cart />
    </div>
  </section>
</template>

<style scoped>
.gadgets {
  max-width: 1000px;
}
.gadgets h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.gadgets-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}
@media (max-width: 800px) {
  .gadgets-layout {
    grid-template-columns: 1fr;
  }
}
</style>
