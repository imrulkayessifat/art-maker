export interface ImagePainterProps {
    imageBuffer: string | ArrayBuffer | null;
}

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
