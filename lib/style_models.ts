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
    activeTitle: string,
    setModelData:React.Dispatch<React.SetStateAction<ModelItem[]>>
) => {
    const itemAllIndex = model.All.findIndex((item) => item.id === id);
    const itemPopularIndex = model.Popular.findIndex((item) => item.id === id);
    const itemFavIndex = model.Favorites.findIndex((item) => item.id === id);

    if (itemAllIndex !== -1 && itemPopularIndex !== -1) {
        if (model.All[itemAllIndex].isFav || model.Popular[itemPopularIndex].isFav) {
            model.All[itemAllIndex].isFav = false;
            model.Popular[itemPopularIndex].isFav = false;
            if (itemFavIndex !== -1) {
                model.Favorites.splice(itemFavIndex, 1);
                if (activeTitle === 'Favorites') {
                    setModelData(model.Favorites);
                }
            }
        } else {
            model.All[itemAllIndex].isFav = true;
            model.Popular[itemPopularIndex].isFav = true;
            if (itemFavIndex === -1) {
                model.Favorites.push({ ...model.All[itemAllIndex], isFav: true });
                if (activeTitle === 'Favorites') {
                    setModelData(model.Favorites);
                }
            }
        }
    }
};
