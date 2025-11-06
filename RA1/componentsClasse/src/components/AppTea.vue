<script setup>
import { ref } from 'vue'
import TeaPlans from './TeaPlans.vue'

const teaTypes = ['Verds', 'Vermells', 'Negres', 'Rooibos']

const nomRebut = ref('')

const conseguirNom = (nom) => {
  nomRebut.value = nom
}
</script>

<template>
  <div class="content">
    <h1 class="title">Subscripcions disponibles</h1>
    <h2 class="subtitle">Disposem dels millors tes del món</h2>
    <TeaPlans v-for="type in teaTypes" :key="type" :type="type" @typeTea="conseguirNom" />
    <span>{{ nomRebut }}</span>
  </div>
</template>
