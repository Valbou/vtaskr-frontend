<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <RouterLink to="/">
      <img src="@/assets/vtaskr-logo-light.svg" alt="vTaskr logo" />
    </RouterLink>
  </header>
  <section>
    <RouterView />
  </section>
  <footer>
  </footer>
</template>
