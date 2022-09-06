<template>
  <div class="after-enter">
    <OrganismsCampaignShowMain />
    <OrganismsCampaignShowFooter
      @toggle-audio-button-click="toggleAudio"
      @toggle-video-button-click="toggleVideo"
      @disconnect-button-click="sessionDisconnect"
      @share-screen-button-click="shareScreen"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  sessionId: string;
  sessionToken: string;
  vonageApiKey: string;
}>();

const emit = defineEmits(["loading"]);

const {
  initSession,
  initPublisher,
  connectSession,
  sessionDisconnect,
  shareScreen,
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
  emit("loading");
});

const toggleAudio = (audioFlag: boolean) => {
  vonageToggleAudio(audioFlag);
};

const toggleVideo = (videoFlag: boolean) => {
  vonageToggleVideo(videoFlag);
};
</script>
