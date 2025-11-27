<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const cart = inject('cart')
const clearCart = inject('clearCart')
const totalItems = inject('totalItems')
const totalPrice = inject('totalPrice')
</script>

<template>
  <section class="cart">
    <h2>Carret</h2>

    <p v-if="!cart || cart.length === 0">
      Encara no has afegit cap producte.
    </p>

    <template v-else>
      <CartItem
        v-for="(item, index) in cart"
        :key="index"
        :item="item"
      />

      <p class="summary">
        Articles totals:
        <strong>{{ totalItems }}</strong>
      </p>
      <p class="summary">
        Total:
        <strong>{{ totalPrice.toFixed(2) }} €</strong>
      </p>

      <button type="button" class="clear-btn" @click="clearCart">
        Buida carret
      </button>
    </template>
  </section>
</template>

<style scoped>
.cart {
  border-radius: 0.75rem;
  border: 1px solid #eee;
  padding: 1rem 1.25rem;
  background: #fff;
}
.summary {
  margin-top: 0.5rem;
}
.clear-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: none;
  background: #e74c3c;
  color: #fff;
  cursor: pointer;
}
.clear-btn:hover {
  background: #c0392b;
}
</style>
