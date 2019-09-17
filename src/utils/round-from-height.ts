import store from "@/store";

export const roundFromHeight = (height: number): number => {
  if (isNaN(height)) {
    return 0;
  }

  const activeDelegates: number = store.getters["network/activeDelegates"];

  return Math.floor(height / activeDelegates) + (height % activeDelegates > 0 ? 1 : 0);
};
