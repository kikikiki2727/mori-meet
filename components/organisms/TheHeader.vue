<template>
  <header v-if="isDisplay" class="header">
    <div class="left">
      <NuxtLink to="/" class="nuxtLink">
        <AtomsIconMovie />
        <div class="context">
          <p class="text">Mori</p>
          <p class="text">Meet</p>
        </div>
      </NuxtLink>
    </div>
    <div class="right">
      <div class="date">{{ currentDate }}</div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { currentDate } = useDateFns();
const isDisplay = ref(true);

const route = useRoute();
watch(
  () => route.query,
  (updatedQuery) => {
    isDisplay.value = updatedQuery.enter === "after" ? false : true;
  }
);
</script>
