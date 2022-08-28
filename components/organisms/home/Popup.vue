<template>
  <div v-if="isDisplay" class="selection-popup">
    <div class="popup">
      <div class="section" @click="createMeetingNextTime">
        <AtomsIconLink />
        <p class="text">次回以降の会議を作成</p>
      </div>
      <div class="section">
        <AtomsIconPlus />
        <p class="text">会議を今すぐ開始</p>
      </div>
      <div class="section">
        <AtomsIconCalendar />
        <p class="text">Moriカレンダーでスケジュールを設定</p>
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

const createMeetingNextTime = () => {
  isDisplay.value = false;
};

defineExpose({
  isDisplay,
});
</script>

<style lang="scss" scoped>
.selection-popup {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;

  > .popup {
    box-shadow: 0 5px 8px gray;
    border-radius: 5px;
    position: absolute;
    top: 43%;
    left: 6%;
    z-index: 3;
    background-color: white;

    > .section {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 0 20px;

      &:hover {
        background-color: rgba(155, 155, 155, 0.3);
        cursor: pointer;
      }

      > .icon {
        &.-link {
          transform: rotate(45deg);
        }
      }
    }
  }

  .overlay {
    height: 100%;
    width: 100%;
    z-index: 2;
  }
}
</style>
