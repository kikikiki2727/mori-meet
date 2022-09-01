<template>
  <div>
    <div class="campaign-show">
      <div class="main">
        <OrganismsCampaignParticipants />
        <div class="sidebar"></div>
      </div>
      <OrganismsCampaignFooter
        :toggleAudio="toggleAudio"
        :toggleVideo="toggleVideo"
      />
    </div>
    <transition name="fade">
      <OrganismsParticipating v-if="!isLoaded" />
    </transition>
  </div>
</template>

<script setup lang="ts">
const isLoaded = ref(false);
const {
  public: { ApiBaseUrl },
} = useRuntimeConfig();

const { fetchCampaign } = useCampaign(ApiBaseUrl);
const { data: campaign } = await fetchCampaign();
const { generateToken } = useVonageRep(ApiBaseUrl, campaign.value.sessionId);
const { data: tokenData } = await generateToken();

const { initSession, initPublisher, connectSession, toggleAudio, toggleVideo } =
  await useVonage({
    sessionId: campaign.value.sessionId,
    sessionToken: tokenData.value.token,
    vonageApiKey: tokenData.value.apiKey,
  });

onMounted(() => {
  initSession();
  initPublisher();
  connectSession();
  isLoaded.value = true;
});
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
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
