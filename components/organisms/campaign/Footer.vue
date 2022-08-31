<template>
  <div class="footer">
    <div class="left"></div>
    <div class="center">
      <button class="mic" @click="toggleMicButton">
        <AtomsIconMicOff v-if="isMicOFF" />
        <AtomsIconMicOn v-else />
      </button>
      <button class="camera" @click="toggleCameraButton">
        <AtomsIconCameraOff v-if="isCameraOFF" />
        <AtomsIconCameraOn v-else />
      </button>
      <button class="screen-sharing">
        <AtomsIconScreenSharing />
      </button>
      <button class="phone">
        <AtomsIconPhone />
      </button>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
const isMicOFF = ref(false);
const toggleMicButton = () => {
  isMicOFF.value = !isMicOFF.value;
};

const isCameraOFF = ref(false);
const toggleCameraButton = () => {
  isCameraOFF.value = !isCameraOFF.value;
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 15%;
  gap: 0.5%;
  display: flex;
  justify-content: center;
  align-items: center;

  > .left {
    width: 33%;
  }

  > .center {
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: gray;
      border-radius: 50%;
      padding: 10px;
    }

    > .phone {
      background-color: red;
      border-radius: 30px;
      width: 80px;
    }
  }

  > .right {
    width: 33%;
  }
}
</style>
