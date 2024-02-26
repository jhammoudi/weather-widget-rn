import { create } from "zustand";

export const useLocationStore = create((set) => ({
  location: {},
  setLocation: (location) =>
    set({
      location,
    }),
}));

export const useMarkerLocationStore = create((set) => ({
  markerLocation: {},
  setMarkerLocation: (markerLocation) =>
    set({
      markerLocation,
    }),
}));
