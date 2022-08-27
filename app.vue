<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
<script setup>
const aaa = ref({});
const runtimeConfig = useRuntimeConfig();
onMounted(() => {
  aaa.value = { a: "a", b: "b" };
  console.log("onMounted", aaa.value);
  console.log("onMounted", runtimeConfig.public.ApiBaseUrl);
});
</script>
