<script setup>
import { ref, computed } from 'vue'

const nomUsuari = ref('')
const selected = ref('')
const texte = ref('')
const activo = ref(true)

const productes = [
  { id: 1, nom: 'Ordinador', preu: 1000 },
  { id: 2, nom: 'Telèfon', preu: 500 },
  { id: 3, nom: 'Tablet', preu: 300 },
]

const nombre = ref('Joan')

const nomMajuscules = computed(() => nombre.value.toUpperCase())
</script>

<template>
  <div>
    <h1>V-MODEL</h1>
    <!-- Input -->
    <p>Nom de l'usuari: {{ nomUsuari }}</p>
    <input v-model="nomUsuari" placeholder="Escriu el teu nom" />

    <!-- Select -->
    <div>Selected: {{ selected }}</div>
    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>

    <!-- Textarea -->
    <p>{{ texte }}</p>
    <textarea v-model="texte"></textarea>
  </div>

  <h1>V-If</h1>
  <div>
    <!-- Aquí puedes probar algo como: -->
    <p v-if="nomUsuari">Hola, {{ nomUsuari }}!</p>
    <p v-else>Escriu el teu nom per saludar-te.</p>
  </div>

  <h1>V-FOR</h1>
  <div>
    <ul>
      <li v-for="producte in productes" :key="producte.id">
        {{ producte.nom }} - {{ producte.preu }}€
      </li>
    </ul>
  </div>

  <h1>V-IF TERNARIO</h1>
  <span>{{ activo ? 'Activo' : 'Inactivo' }}</span>
  <br /><br />
  <button @click="activo = !activo">Cambiar Activo/Inactivo</button>

  <h1>COMPUTED</h1>
  <div>
    <p>Nombre: {{ nombre }}</p>
    <p>Nom en majúscules (computed): {{ nomMajuscules }}</p>
  </div>
</template>
