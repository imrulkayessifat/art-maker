interface ModelItem {
    id: string;
    img: string;
    txt: string;
    isFav?: boolean;
    isItemHovered?: boolean
}
export let model = {
    All: [
        {
            id:'1',
            img: '/style/cinematic_render.jpeg',
            txt: 'Cinematic',
            isFav:false,
            isItemHovered:false
        },
        {
            id:'2',
            img: '/style/euphoric.jpeg',
            txt: 'Euphoric',
            isFav:false,
            isItemHovered:false
        },
        {
            id:'3',
            img: '/style/fantacy.jpeg',
            txt: 'Fantacy',
            isFav:false,
            isItemHovered:false
        },
        {
            id:'4',
            img: '/style/halloween.jpeg',
            txt: 'Halloween',
            isFav:false,
            isItemHovered:false
        },
        {
            id:'5',
            img: '/style/picasso.jpeg',
            txt: 'Picasso',
            isFav:false,
            isItemHovered:false
        },
    ],
    Popular: [
        {
            id:'1',
            img: '/style/cinematic_render.jpeg',
            txt: 'Cinematic',
            isFav:false,
            isItemHovered:false
        },
        {
            id:'2',
            img: '/style/euphoric.jpeg',
            txt: 'Euphoric',
            isFav:false,
            isItemHovered:false
        },
        {
            id:'3',
            img: '/style/fantacy.jpeg',
            txt: 'Fantacy',
            isFav:false,
            isItemHovered:false
        },
    ],
    Favorites: [] as ModelItem[]
}

export const addToFavorites = (
    id: string,
) => {
    const itemAllIndex = model.All.findIndex((item) => item.id === id);
    const itemPopularIndex = model.Popular.findIndex((item) => item.id === id);
    const itemFavIndex = model.Favorites.findIndex((item) => item.id === id);

    model.All[itemAllIndex].isFav = !model.All[itemAllIndex].isFav
    if (model.Popular[itemPopularIndex]) {
        model.Popular[itemPopularIndex].isFav = !model.Popular[itemPopularIndex].isFav
    }
    if (!model.All[itemAllIndex].isFav) {
        if (itemFavIndex !== -1) {
            model.Favorites.splice(itemFavIndex, 1);
        }
    } else {
        if (itemFavIndex === -1) {
            model.Favorites.push(model.All[itemAllIndex]);
        }
    }
};
