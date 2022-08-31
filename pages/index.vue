<template>
  <div>
    <div v-if="!isLoading" class="home">
      <div class="home-containar">
        <OrganismsHomeLeft @new-meet-button-click="displaySelectionPopup" />
        <OrganismsHomeRight />
      </div>
      <OrganismsHomePopup
        ref="selectionPopup"
        @now-meeting-button-click="createMeetingNow"
      />
    </div>
    <transition name="fade">
      <OrganismsParticipating v-if="isLoading" />
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
  router.push(`/campaign/${campaign.value.id}`);
};
</script>

<style lang="scss" scoped>
.home-containar {
  display: flex;
  justify-content: space-between;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
