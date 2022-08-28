<template>
  <div class="left">
    <div class="introduction">
      <div class="top">
        <p>プレミアムなビデオ会議。今なら誰でも無料でご利用いただけます。</p>
      </div>
      <div class="bottom">
        <p>
          Moriでは、安全性の高いビジネス会議サービス「Mori
          Meet」を刷新して、どなたでも無料でご利用いただけるようにしました。
        </p>
      </div>
    </div>
    <div class="main">
      <button class="button">
        <AtomsIconCamera />
        <p class="text" @click="emit('new-meet-button-click')">
          新しい会議を作成
        </p>
      </button>
      <div class="meetCode">
        <AtomsIconKeyboard />
        <input class="input" placeholder="会議コードまたはリンクを入力" />
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["new-meet-button-click"]);
</script>

<style lang="scss" scoped>
.left {
  width: 50%;

  > .introduction {
    width: 70%;
    margin: 0 auto;

    > .top {
      font-size: 2rem;
    }
  }

  > .main {
    width: 70%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    > .button {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      background-color: rgb(26, 120, 230);
      gap: 10px;
      height: 50px;
      width: 200px;
      padding: 0 10px;
      border-radius: 5px;

      &:hover {
        background-color: rgba(26, 120, 230, 0.8);
      }

      > .text {
        font-size: 1rem;
      }
    }

    > .meetCode {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      height: 50px;
      width: calc(100% - 210px);
      border: 1px solid rgba(0, 0, 0, 0.16);
      padding: 0 10px;
      border-radius: 5px;
      margin-right: 20px;

      > .input {
        border: none;
        height: 80%;
        width: 80%;
        font-size: 1rem;
      }
    }
  }
}
</style>
