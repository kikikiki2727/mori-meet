<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
<script setup>
const aaa = ref({});
const bbb = ref("");
onMounted(() => {
  aaa.value = { a: "a", b: "b" };
  console.log("onMounted", aaa.value);
  bbb.value = "bbb";
  console.log("onMounted", bbb.value);
});
</script>
