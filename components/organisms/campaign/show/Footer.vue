<template>
  <div class="footer">
    <div class="left"></div>
    <div class="center">
      <button class="audio" @click="toggleAudioButton">
        <SharedIconMicOn v-if="isActiveAudio" />
        <SharedIconMicOff v-else />
      </button>
      <button class="video" @click="toggleVideoButton">
        <SharedIconCameraOn v-if="isActiveVideo" />
        <SharedIconCameraOff v-else />
      </button>
      <button class="screen-sharing" @click="emit('share-screen-button-click')">
        <SharedIconScreenSharing />
      </button>
      <button class="phone" @click="emit('disconnect-button-click')">
        <SharedIconPhone />
      </button>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits([
  "toggle-audio-button-click",
  "toggle-video-button-click",
  "disconnect-button-click",
  "share-screen-button-click",
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
