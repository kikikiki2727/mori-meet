<template>
  <div class="participants">
    <div id="videos"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.participants {
  width: calc(100% - 100px);
  height: calc(100% - 100px);
  margin: 50px;

  > #videos {
    width: 100%;
    height: 100%;
  }
}
</style>
