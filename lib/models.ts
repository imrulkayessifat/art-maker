interface ModelItem {
    id: string;
    img: string;
    txt: string;
    isFav?: boolean; // Making isFav optional
}
export let model = {
    All: [
        {
            id:'1',
            img: '/v5-anime.jpeg',
            txt: 'V5 Anime',
            isFav:false
        },
        {
            id:'2',
            img: '/v5-beta.jpeg',
            txt: 'V5 Beta',
            isFav:false
        },
        {
            id:'3',
            img: '/imagine-v4.jpeg',
            txt: 'Imagine V4',
            isFav:false
        },
        {
            id:'4',
            img: '/image-v3.jpeg',
            txt: 'Imagine V3',
            isFav:false
        },
        {
            id:'5',
            img: '/sdxl.jpeg',
            txt: 'SDXL',
            isFav:false
        },
    ],
    Popular: [
        {
            id:'1',
            img: '/v5-anime.jpeg',
            txt: 'V5 Anime',
            isFav:false
        },
        {
            id:'2',
            img: '/v5-beta.jpeg',
            txt: 'V5 Beta',
            isFav:false
        },
        {
            id:'3',
            img: '/imagine-v4.jpeg',
            txt: 'Imagine V4',
            isFav:false
        },
    ],
    Favorites: [] as ModelItem[]
}

export const addToFavorites = (id: string) => {
    const itemAllIndex = model.All.findIndex((item) => item.id === id);
    const itemPopularIndex = model.Popular.findIndex((item) => item.id === id);
    const itemFavIndex = model.Favorites.findIndex((item) => item.id === id);

    if (itemAllIndex !== -1 && itemPopularIndex !== -1) {
        if (model.All[itemAllIndex].isFav || model.Popular[itemPopularIndex].isFav) {
            model.All[itemAllIndex].isFav = false;
            model.Popular[itemPopularIndex].isFav = false;
            if (itemFavIndex !== -1) {
                model.Favorites.splice(itemFavIndex, 1);
            }
        } else {
            model.All[itemAllIndex].isFav = true;
            model.Popular[itemPopularIndex].isFav = true;
            if (itemFavIndex === -1) {
                model.Favorites.push({ ...model.All[itemAllIndex], isFav: true });
            }
        }
    }
};
