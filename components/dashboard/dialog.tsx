import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from 'lucide-react';

import {
    CommandItem,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { model, addToFavorites } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { useDataStore } from "@/hooks/useModalDialog";

interface DialogProps {
    open: boolean;
    handleModel: () => void;
}

interface ModelItem {
    id: string;
    img: string;
    txt: string;
    isFav?: boolean;
    isItemHovered?: boolean;
}

const titles = ['All', 'Popular', 'Favorites']

const Dialog: React.FC<DialogProps> = (
    {
        open, handleModel
    }
) => {
    const [activeTitle, setActiveTitle] = useState<string>(titles[0]);
    const [modelData, setModelData] = useState<ModelItem[]>(
        model['All'].map((item) => ({ ...item, isItemHovered: false }))
    );
    const pushData = useDataStore((state) => state.pushData);

    const handleMouseEnter = (index: number) => {
        const updatedModelData = [...modelData];
        updatedModelData[index].isItemHovered = true;
        setModelData(updatedModelData);
    };

    const handleMouseLeave = (index: number) => {
        const updatedModelData = [...modelData];
        updatedModelData[index].isItemHovered = false;
        setModelData(updatedModelData);
    };

    const addFavorite = (id: string) => {
        addToFavorites(id);
        setModelData([...modelData])
        if (activeTitle === 'Favorites') {
            let filteredItems = modelData.filter(item => item.isFav);
            setModelData(filteredItems)
        }
    }

    const addData = (data: ModelItem) => {
        pushData(data)
    }

    useEffect(() => {
        setModelData(model[activeTitle as keyof typeof model])
    }, [activeTitle])

    return (
        <CommandDialog open={open} onOpenChange={handleModel}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <div className="flex w-full m-4 gap-2">
                    {
                        titles.map((title, i) => (
                            <Button
                                variant={'ghost'}
                                key={i}
                                onClick={() => {
                                    setActiveTitle(title);
                                }}
                                className={activeTitle === title ? 'bg-slate-200 rounded-lg' : ''}
                            >
                                <span>{title}</span>
                            </Button>
                        ))
                    }
                </div>
                <CommandSeparator />
                <CommandGroup heading={activeTitle} className="w-full">
                    <div className="grid grid-cols-3 gap-2 m-5 w-full items-center justify-between">
                        {
                            modelData.map((model, i) => {
                                console.log(model.isFav)
                                return (
                                    <CommandItem key={i} className=" w-[120px] h-[100px] mb-2 p-0">
                                        <div
                                            className="rounded-md hover:cursor-pointer relative w-[100px] h-[100px]"
                                            onMouseEnter={() => handleMouseEnter(i)}
                                            onMouseLeave={() => handleMouseLeave(i)}
                                            onClick={() => { addData(model); handleModel }}
                                            key={i}
                                        >
                                            <Image
                                                src={model.img}
                                                alt={''}
                                                layout="fill"
                                                objectFit="cover"
                                                className='rounded-md'
                                            />
                                            <span className="absolute font-bold bottom-2 left-1/4 text-xs text-white">{model.txt}</span>
                                            {

                                                model.isItemHovered && (
                                                    <Heart
                                                        onClick={() => addFavorite(model.id)}
                                                        className={`absolute ${model.isFav ? ' text-orange-500' : 'text-white'} top-2 left-2`}
                                                    />
                                                )
                                            }
                                        </div>
                                    </CommandItem>
                                )
                            })
                        }
                    </div>
                </CommandGroup>

            </CommandList>
        </CommandDialog>
    )
}

export default Dialog