<template>
  <div class="footer">
    <div class="left"></div>
    <div class="center">
      <button class="audio" @click="toggleAudioButton">
        <AtomsIconMicOn v-if="isActiveAudio" />
        <AtomsIconMicOff v-else />
      </button>
      <button class="video" @click="toggleVideoButton">
        <AtomsIconCameraOn v-if="isActiveVideo" />
        <AtomsIconCameraOff v-else />
      </button>
      <button class="screen-sharing">
        <AtomsIconScreenSharing />
      </button>
      <button class="phone">
        <AtomsIconPhone />
      </button>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits([
  "toggle-audio-button-click",
  "toggle-video-button-click",
]);

// マイクオンオフ
const isActiveAudio = ref(true);
const toggleAudioButton = () => {
  isActiveAudio.value = !isActiveAudio.value;
  emit("toggle-audio-button-click", isActiveAudio.value);
};

// ビデオオンオフ
const isActiveVideo = ref(true);
const toggleVideoButton = () => {
  isActiveVideo.value = !isActiveVideo.value;
  emit("toggle-video-button-click", isActiveVideo.value);
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 15%;
  gap: 0.5%;
  display: flex;
  justify-content: center;
  align-items: center;

  > .left {
    width: 33%;
  }

  > .center {
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: gray;
      border-radius: 50%;
      padding: 10px;
    }

    > .phone {
      background-color: red;
      border-radius: 30px;
      width: 80px;
    }
  }

  > .right {
    width: 33%;
  }
}
</style>
