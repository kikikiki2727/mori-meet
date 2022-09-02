<template>
  <div class="campaign-show">
    <div class="main">
      <OrganismsCampaignParticipants />
      <div class="sidebar"></div>
    </div>
    <OrganismsCampaignFooter
      @toggle-audio-button-click="toggleAudio"
      @toggle-video-button-click="toggleVideo"
      @disconnect-button-click="sessionDisconnect"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  sessionId: string;
  sessionToken: string;
  vonageApiKey: string;
}>();

const emit = defineEmits(["loaded"]);

const {
  initSession,
  initPublisher,
  connectSession,
  sessionDisconnect,
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
  connectSession();
  emit("loaded");
});

const toggleAudio = (audioFlag: boolean) => {
  vonageToggleAudio(audioFlag);
};

const toggleVideo = (videoFlag: boolean) => {
  vonageToggleVideo(videoFlag);
};
</script>

<style lang="scss" scoped>
.campaign-show {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);

  > .main {
    width: calc(100% - 100px);
    height: calc(85% - 100px);
    margin: 50px;
  }
}
</style>
