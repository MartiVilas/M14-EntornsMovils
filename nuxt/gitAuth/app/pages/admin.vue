<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });
const { data } = useFetch("/api/admin", {
  lazy: true,
});
</script>

<template>
  <div if="data">
    {{ data?.sensitive }}
  </div>
</template>
