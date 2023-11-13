import { create } from "zustand";

interface ImageState {
    isInImage: string;
    setInImage: (value: string) => void;
}

export const useImageStore = create<ImageState>((set) => ({
    isInImage: '',
    setInImage: (value: string) => set({ isInImage: value }),
}))