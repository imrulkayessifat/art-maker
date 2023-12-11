import { create } from "zustand";

interface ImageRemixState {
    isInImageRemix: string | ArrayBuffer | null,
    setInImageRemix: (value: string | ArrayBuffer | null) => void;
}

export const useImageRemixStore = create<ImageRemixState>((set) => ({
    isInImageRemix: null,
    setInImageRemix: (value: string | ArrayBuffer | null) => set({ isInImageRemix: value }),
}));
