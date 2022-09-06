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
        <SharedIconCamera />
        <p class="text" @click="emit('new-meet-button-click')">
          新しい会議を作成
        </p>
      </button>
      <div class="meetCode">
        <SharedIconKeyboard />
        <input class="input" placeholder="会議コードまたはリンクを入力" />
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["new-meet-button-click"]);
</script>
