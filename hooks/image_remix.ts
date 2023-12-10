import { create } from "zustand";

interface ImageRemixState {
    isInImageRemix: File | null,
    setInImageRemix: (value: File) => void;
}

export const useImageRemixStore = create<ImageRemixState>((set) => ({
    isInImageRemix: null,
    setInImageRemix: (value: File) => set({ isInImageRemix: value }),
}));
