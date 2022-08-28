<template>
  <div class="home-containar">
    <OrganismsHomeLeft @new-meet-button-click="displaySelectionPopup" />
    <OrganismsHomeRight />
  </div>
  <OrganismsHomePopup ref="selectionPopup" />
</template>
<script setup lang="ts">
const {
  public: { ApiBaseUrl },
} = useRuntimeConfig();

const selectionPopup = ref(null);
const displaySelectionPopup = () => {
  selectionPopup.value.isDisplay = true;
};
</script>

<style lang="scss" scoped>
.home-containar {
  display: flex;
  justify-content: space-between;
}
</style>
