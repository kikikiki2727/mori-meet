<template>
  <div>
    <div class="show-container">
      <div id="videos"></div>
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

onMounted(async () => {
  const { initSession, initPublisher } = await useVonage({
    sessionToken: tokenData.value.token,
    vonageApiKey: tokenData.value.apiKey,
  });
  initSession();
  initPublisher();
  isLoaded.value = true;
});
</script>

<style lang="scss" scoped>
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
