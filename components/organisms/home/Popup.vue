<template>
  <div v-if="isDisplay" class="selection-popup">
    <div class="popup">
      <div class="section" @click="createMeetingNextTime">
        <AtomsIconLink />
        <p class="text">次回以降の会議を作成</p>
      </div>
      <div class="section" @click="emit('now-meeting-button-click')">
        <AtomsIconPlus />
        <p class="text">会議を今すぐ開始</p>
      </div>
      <div class="section">
        <AtomsIconCalendar />
        <p class="text" @click="isDisplay = false">
          Moriカレンダーでスケジュールを設定
        </p>
      </div>
    </div>
    <div class="overlay" @click="toggleDisplay"></div>
  </div>
</template>
<script setup lang="ts">
const isDisplay = ref<boolean>(false);
const toggleDisplay = (): void => {
  isDisplay.value = !isDisplay.value;
};

const emit = defineEmits(["now-meeting-button-click"]);

const createMeetingNextTime = () => {
  isDisplay.value = false;
};

defineExpose({
  isDisplay,
});
</script>
