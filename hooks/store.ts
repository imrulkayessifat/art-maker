import {create} from 'zustand'

interface ViewportState {
    isInViewport: boolean;
    setInViewport: (value: boolean) => void;
}

export const useViewportStore = create<ViewportState>((set) => ({
  isInViewport: false,
  setInViewport: (value: boolean) => set({ isInViewport: value }),
}))