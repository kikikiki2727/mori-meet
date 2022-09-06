<template>
  <div class="campaign-show">
    <client-only>
      <OrganismsCampaignShowAfterEnter
        v-if="isEntered"
        :session-id="campaign.sessionId"
        :session-token="tokenData.token"
        :vonageApiKey="tokenData.apiKey"
        @loading="isLoading = false"
      />
      <OrganismsCampaignShowBeforeEnter
        v-else
        :session-id="campaign.sessionId"
        :session-token="tokenData.token"
        :vonageApiKey="tokenData.apiKey"
        @loading="isLoading = false"
      />
    </client-only>
    <transition name="fade">
      <SharedEntering v-if="isLoading" />
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

const isLoading = ref(true);

const isEntered = ref(false);
const route = useRoute();
if (route.query.enter === "after") isEntered.value = true;

const enterMeeting = () => {
  delete route.query.enter;
  const router = useRouter();
  router.push({ query: { enter: "after" } });
  isEntered.value = true;
};
</script>
