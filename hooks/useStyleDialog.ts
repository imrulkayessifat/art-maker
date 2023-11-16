import { create } from "zustand";

export interface Item {
    id: string;
    img: string;
    txt: string;
    isFav?: boolean;
}

export interface DataStore {
    model: Item;
    pushData: (value: Item) => void;
}

export const useDataStore = create<DataStore>((set) => ({
    model:
    {
        id: '2',
        img: '/style/euphoric.jpeg',
        txt: 'Euphoric',
        isFav: false,
    },
    pushData: (value: Item) =>
        set({ model: value }),
}));
