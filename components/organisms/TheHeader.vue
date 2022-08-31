<template>
  <div v-if="!route.path.includes('campaign')" class="header">
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
  </div>
</template>

<script setup lang="ts">
const { currentDate } = useDateFns();
const route = useRoute();
</script>

<style lang="scss" scoped>
.header {
  padding: 0 10px;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .left > .nuxtLink {
    display: flex;
    align-items: center;
    gap: 15px;

    > .context {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    > .text {
      font-size: 1.3rem;

      &:first-of-type {
        font-weight: bold;
        font-size: 1.4rem;
      }
    }
  }

  > .right {
    display: flex;
    align-items: center;
  }
}
</style>
