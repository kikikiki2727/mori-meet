<template>
  <div class="home">
    <div class="home-container" v-if="!isLoading">
      <OrganismsHomeLeft @new-meet-button-click="displaySelectionPopup" />
      <OrganismsHomeRight />
    </div>
    <OrganismsHomePopup
      ref="selectionPopup"
      @now-meeting-button-click="createMeetingNow"
    />
    <transition name="fade">
      <OrganismsEntering v-if="isLoading" />
    </transition>
  </div>
</template>
<script setup lang="ts">
const {
  public: { ApiBaseUrl },
} = useRuntimeConfig();
const router = useRouter();

const selectionPopup = ref(null);
const displaySelectionPopup = () => {
  selectionPopup.value.isDisplay = true;
};

const { createCampaign } = useCampaign(ApiBaseUrl);
const isLoading = ref(false);
const createMeetingNow = async () => {
  isLoading.value = true;
  const { data: campaign } = await createCampaign();
  router.push(`/campaign/${campaign.value.id}?enter=after`);
};
</script>
