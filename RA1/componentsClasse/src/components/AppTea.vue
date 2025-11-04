<script setup>
import TeaPlans from './TeaPlans.vue'

const teaTypes = ['Verds', 'Vermells', 'Negres', 'Rooibos']
</script>

<template>
  <div class="content">
    <h1 class="title">Subscripcions disponibles</h1>
    <h2 class="subtitle">Disposem dels millors tes del món</h2>

    <TeaPlans v-for="type in teaTypes" :type="type" :key="type" />
  </div>
</template>
