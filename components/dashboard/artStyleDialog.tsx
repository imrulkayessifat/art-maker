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
import { model,addToFavorites } from "@/lib/style_models";
import { Button } from "@/components/ui/button";
import { useDataStore } from "@/hooks/useStyleDialog";

interface DialogProps {
    open: boolean;
    handleModel: () => void;
}

interface ModelItem {
    id: string;
    img: string;
    txt: string;
    isFav?:boolean;
}

const titles = ['All', 'Popular', 'Favorites']

const ArtStyleDialog: React.FC<DialogProps> = (
    {
        open, handleModel
    }
) => {
    const [activeTitle, setActiveTitle] = useState<string>(titles[0]);
    const [isHovered, setIsHovered] = useState(false);
    const [modelData, setModelData] = useState<ModelItem[]>(model['All'])
    const pushData = useDataStore((state) => state.pushData);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const addFavorite = (id:string) => {
        addToFavorites(id);
    }

    const addData = (data:ModelItem) => {
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
                                return (
                                    <CommandItem  key={i} className=" w-[120px] h-[100px] mb-2 p-0">
                                        <div
                                            className="rounded-md hover:cursor-pointer relative w-[100px] h-[100px]"
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={()=>{addData(model);handleModel}}
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
                                                isHovered && (
                                                    <Heart
                                                        onClick={() => addFavorite(model.id)}
                                                        className={`absolute ${model.isFav && ' text-orange-500'} top-2 left-2 text-white`}
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

export default ArtStyleDialog