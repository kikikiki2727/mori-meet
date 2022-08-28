<template>
  <div class="show-container">
    <div id="videos"></div>
  </div>
</template>

<script setup lang="ts">
const {
  public: { ApiBaseUrl },
} = useRuntimeConfig();

const { fetchCampaign } = await useCampaign(ApiBaseUrl);
const { data: campaign } = await fetchCampaign();
const { generateToken } = await useVonageRep(
  ApiBaseUrl,
  campaign.value.sessionId
);
const { data: tokenData } = await generateToken();

onMounted(async () => {
  const { initSession, initPublisher } = await useVonage({
    sessionToken: tokenData.value.token,
    vonageApiKey: tokenData.value.sessionId,
  });
  initSession();
  initPublisher();
});
</script>

<style lang="scss" scoped></style>
