export interface ImagePainterProps {
    imageBuffer: string | ArrayBuffer | null;
}

export type CursorStyles = {
    draw: string;
    eraser: string;
    undo: string;
    redo: string;
    pan: string;
    default: string;
    [key: string]: string;  // This is the index signature
};

export type IconsProps = {
    react_icons: JSX.Element;
    content: string;
    canvasClick: string;
}

export interface ScaleOffset {
    x: number;
    y: number;
}

export type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;
