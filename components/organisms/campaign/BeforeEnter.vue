<template>
  <div class="before-enter">
    <div class="left">
      <div id="videos"></div>
      <button class="audio" @click="toggleAudioButton">
        <MoleculesIconMicOn v-if="isActiveAudio" />
        <MoleculesIconMicOff v-else />
      </button>
      <button class="video" @click="toggleVideoButton">
        <MoleculesIconCameraOn v-if="isActiveVideo" />
        <MoleculesIconCameraOff v-else />
      </button>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["loading"]);

const props = defineProps<{
  sessionId: string;
  sessionToken: string;
  vonageApiKey: string;
}>();

// マイクオンオフ
const isActiveAudio = ref(true);
const toggleAudioButton = () => {
  isActiveAudio.value = !isActiveAudio.value;
  vonageToggleAudio(isActiveAudio.value);
};

// ビデオオンオフ
const isActiveVideo = ref(true);
const toggleVideoButton = () => {
  isActiveVideo.value = !isActiveVideo.value;
  vonageToggleVideo(isActiveVideo.value);
};

const {
  initSession,
  initPublisher,
  toggleAudio: vonageToggleAudio,
  toggleVideo: vonageToggleVideo,
} = await useVonage({
  sessionId: props.sessionId,
  sessionToken: props.sessionToken,
  vonageApiKey: props.vonageApiKey,
});

onMounted(() => {
  initSession();
  initPublisher();
  emit("loading");
});
</script>

<style lang="scss">
.before-enter {
  background-color: black;

  button {
    border: solid 1px white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
}
</style>
