<template>
  <div>
    <client-only>
      <TemplatesCampaignShow
        :session-id="campaign.sessionId"
        :session-token="tokenData.token"
        :vonageApiKey="tokenData.apiKey"
        @loaded="isLoaded = true"
      />
    </client-only>
    <transition name="fade">
      <OrganismsParticipating v-if="!isLoaded" />
    </transition>
  </div>
</template>

<script setup lang="ts">
const {
  public: { ApiBaseUrl },
} = useRuntimeConfig();

const { fetchCampaign } = useCampaign(ApiBaseUrl);
const { data: campaign } = await fetchCampaign();

const { generateToken } = useVonageRep(ApiBaseUrl, campaign.value.sessionId);
const { data: tokenData } = await generateToken();

const isLoaded = ref(false);
</script>
