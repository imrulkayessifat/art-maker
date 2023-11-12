import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from 'lucide-react';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { model } from "@/lib/models";
import { Button } from "@/components/ui/button";

interface DialogProps {
    open: boolean;
    handleModel: () => void;
}

const titles = ['All', 'Popular', 'Favorites']

const Dialog: React.FC<DialogProps> = (
    {
        open, handleModel
    }
) => {
    const [activeTitle, setActiveTitle] = useState<string>(titles[0]);
    const [isHovered, setIsHovered] = useState(false);
    const [modelData, setModelData] = useState<string[]>(model['All'])

    useEffect(() => {
        setModelData(model[activeTitle as keyof typeof model])
    }, [activeTitle])

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <CommandDialog open={open} onOpenChange={handleModel}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup className="w-full">
                    <div className="flex w-full gap-2">
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
                </CommandGroup>
                <CommandSeparator />
                <div className="grid grid-cols-3 gap-2 m-5 w-full items-center justify-between">
                    {
                        modelData.map((model, i) => (
                            <div
                                className="rounded-md hover:cursor-pointer relative w-[100px] h-[100px]"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                key={i}
                            >
                                <Image
                                    src={model}
                                    alt={''}
                                    layout="fill"
                                    objectFit="cover"
                                    className='rounded-md'
                                />
                                {
                                    isHovered && (
                                        <Heart
                                            className="absolute top-2 left-2 text-white"
                                        />
                                    )
                                }

                            </div>
                        ))
                    }
                </div>
            </CommandList>
        </CommandDialog>
    )
}

export default Dialog