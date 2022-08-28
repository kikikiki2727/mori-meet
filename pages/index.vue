<template>
  <div class="home-containar">
    <OrganismsHomeLeft />
    <OrganismsHomeRight />
  </div>
</template>
<script setup lang="ts">
const {
  public: { ApiBaseUrl },
} = useRuntimeConfig();
</script>

<style lang="scss" scoped>
.home-containar {
  display: flex;
  justify-content: space-between;
}
</style>
