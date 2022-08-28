<template>
  <div class="home">
    <div class="home-containar">
      <OrganismsHomeLeft @new-meet-button-click="displaySelectionPopup" />
      <OrganismsHomeRight />
    </div>
    <OrganismsHomePopup
      ref="selectionPopup"
      @now-meeting-button-click="createMeetingNow"
    />
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

const { createCampaign } = await useCampaign(ApiBaseUrl);

const createMeetingNow = async () => {
  const { data: campaign } = await createCampaign();
  router.push(`/campaign/${campaign.value.id}`);
};
</script>

<style lang="scss" scoped>
.home-containar {
  display: flex;
  justify-content: space-between;
}
</style>
