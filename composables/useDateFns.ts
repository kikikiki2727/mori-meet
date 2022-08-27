export const useDateFns = () => {
  const { $formatDate } = useNuxtApp();
  const dateInstance = new Date();
  const dayOfWeekList = ["日", "月", "火", "水", "木", "金", "土"];
  const dayOfWeekToday: string = dayOfWeekList[dateInstance.getDay()];
  const currentDate = ref<string>(
    $formatDate(dateInstance, `HH:mm・M月d日(${dayOfWeekToday})`)
  );

  onMounted(() => {
    const oneSecond = 1000;
    setInterval(() => {
      currentDate.value = $formatDate(
        new Date(),
        `HH:mm・M月d日(${dayOfWeekToday})`
      );
    }, oneSecond);
  });
  return { currentDate };
};
