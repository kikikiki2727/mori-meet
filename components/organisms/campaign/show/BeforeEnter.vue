<template>
  <div class="before-enter">
    <div class="left">
      <div id="videos">
        <div class="buttons">
          <button class="audio" @click="toggleAudioButton">
            <SharedIconMicOn v-if="isActiveAudio" />
            <SharedIconMicOff v-else />
          </button>
          <button class="video" @click="toggleVideoButton">
            <SharedIconCameraOn v-if="isActiveVideo" />
            <SharedIconCameraOff v-else />
          </button>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="contents">
        <p>参加準備は整いましたか？</p>
        <p v-if="true">あなた以外にまだ誰も参加していません</p>
        <p v-else>〇〇さんがこの通話に参加しています</p>
        <button>今すぐ参加</button>
      </div>
    </div>
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
