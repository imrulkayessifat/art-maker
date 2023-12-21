import { CiSquarePlus, CiSquareMinus, CiSettings } from 'react-icons/ci';
import { MdDraw } from 'react-icons/md';
import { FaEraser } from 'react-icons/fa6';
import { IoArrowUndoCircleOutline, IoArrowRedoCircleOutline } from 'react-icons/io5';
import { TbDragDrop2 } from 'react-icons/tb';

import { IconComponent } from '@/type/types';

interface IconDefinition {
    react_icons: IconComponent;
    content: string;
    canvasClick: string;
}


export const icons: IconDefinition[] = [
    {
        react_icons: CiSquarePlus,
        content: 'Zoom In',
        canvasClick: 'zoomin'
    },
    {
        react_icons: CiSquareMinus,
        content: 'Zoom Out',
        canvasClick: 'zoomout'
    },
    {
        react_icons: MdDraw,
        content: 'Draw',
        canvasClick: 'draw'
    },
    {
        react_icons: FaEraser,
        content: 'Eraser',
        canvasClick: 'eraser'
    },
    {
        react_icons: IoArrowUndoCircleOutline,
        content: 'Undo',
        canvasClick: 'undo'
    },
    {
        react_icons: IoArrowRedoCircleOutline,
        content: 'Redo',
        canvasClick: 'redo'
    },
    {
        react_icons: TbDragDrop2,
        content: 'Pan',
        canvasClick: 'pan'
    },
    {
        react_icons: CiSettings,
        content: 'Default',
        canvasClick: 'default'
    }
]