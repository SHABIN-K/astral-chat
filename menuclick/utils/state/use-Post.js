import { create } from "zustand";

const useShopStore = create((set) => ({
  shops: [],
  setShops: (userShops) => set({ shops: userShops }),
}));

export { useShopStore };
