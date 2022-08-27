import { format } from "date-fns";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate: (date, dateFormat, options?) =>
        format(date, dateFormat, options),
    },
  };
});
