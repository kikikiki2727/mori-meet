<template>
  <div class="footer">
    <div class="left"></div>
    <div class="center">
      <button class="mic">マイク</button>
      <button class="camera">カメラ</button>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 100%;
  gap: 0.5%;
  display: flex;

  > .left {
    width: 33%;
  }

  > .center {
    width: 33%;
  }

  > .right {
    width: 33%;
  }
}
</style>
