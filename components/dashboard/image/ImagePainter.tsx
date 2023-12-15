import React, { useState, useRef, useEffect, MouseEvent, useCallback } from 'react';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { MdDraw } from "react-icons/md";
import { FaPaintBrush } from "react-icons/fa";
import { IoArrowUndoCircleOutline } from "react-icons/io5";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ImagePainterProps {
  imageBuffer: string | ArrayBuffer | null;
}

interface IconsProps {
  react_icons: JSX.Element;
  content: string;
  canvasClick: string;
}

const icons: IconsProps[] = [
  {
    react_icons: <CiSquarePlus className="w-8 h-8 cursor-pointer" />,
    content: 'Zoom In',
    canvasClick: 'zoomin'
  },
  {
    react_icons: <CiSquareMinus className="w-8 h-8 cursor-pointer" />,
    content: 'Zoom Out',
    canvasClick: 'zoomout'
  },
  {
    react_icons: <MdDraw className="w-8 h-8 cursor-pointer" />,
    content: 'Draw',
    canvasClick: 'draw'
  },
  {
    react_icons: <FaPaintBrush className="w-7 h-7 cursor-pointer" />,
    content: 'Brush',
    canvasClick: 'brush'
  },
  {
    react_icons: <IoArrowUndoCircleOutline className="w-8 h-8 cursor-pointer" />,
    content: 'Undo',
    canvasClick: 'undo'
  }
]

const ImagePainter: React.FC<ImagePainterProps> = ({ imageBuffer }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasFunctionality, setCanvasFunctionality] = useState<string>('');
  const [isPainting, setIsPainting] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);

  const svgImage = `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="5" fill="white"/>
  </svg>
  `;

  const base64Image = btoa(svgImage);
  console.log(base64Image)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageBuffer) {
      console.error('Canvas or image buffer not available.');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available.');
      return;
    }

    const drawImage = (src: string) => {
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
      image.onerror = (error) => {
        console.error('Error loading the image:', error);
      };
      image.src = src;
    };

    if (typeof imageBuffer === 'string') {
      drawImage(imageBuffer);
    } else if (imageBuffer instanceof ArrayBuffer) {
      const blob = new Blob([imageBuffer]);
      const blobUrl = URL.createObjectURL(blob);
      drawImage(blobUrl);
      URL.revokeObjectURL(blobUrl);
    } else {
      console.error('Invalid imageBuffer type.');
    }
    ctx.scale(scale, scale);
  }, [imageBuffer, scale]);

  const handleZoomIn = useCallback(() => {
    setScale(scale + 0.1);
  }, [scale])

  const handleZoomOut = useCallback(() => {
    setScale(scale - 0.1);
  }, [scale]);

  const startPaint = (event: MouseEvent<HTMLCanvasElement>) => {
    const cursorSize = 24;
    const { offsetX, offsetY } = event.nativeEvent;
    const startingX = offsetX + cursorSize / 2;
    const startingY = offsetY + cursorSize / 2;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(startingX, startingY);
    setIsPainting(true);
  };

  const paint = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isPainting) return;

    const cursorSize = 24;
    const { offsetX, offsetY } = event.nativeEvent;
    const startingX = offsetX + cursorSize / 2;
    const startingY = offsetY + cursorSize / 2;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = 'white'; // Set the paint color to white
    ctx.lineWidth = 6;

    ctx.lineTo(startingX, startingY);
    ctx.stroke();
  };

  const endPaint = () => {
    setIsPainting(false);
  };

  return (
    <div>
      <div className='flex justify-start gap-2 pb-1'>
        {
          icons.map((icon, i) => (
            <HoverCard key={i}>
              <HoverCardContent className="w-30 mt-5 bg-slate-900">
                <div className="space-y-1 space-x-1">
                  <h5 className="text-sm text-white font-semibold">{icon.content}</h5>
                </div>
              </HoverCardContent>
              <HoverCardTrigger asChild>
                <Button
                  onClick={() => {
                    setCanvasFunctionality(`${icon.canvasClick}`)
                  }}
                  className='px-1' variant={"outline"}
                >
                  {React.cloneElement(icon.react_icons, {
                    className: `${icon.react_icons.props.className} ${canvasFunctionality === icon.canvasClick ? 'text-sky-500' : ''}`
                  })}
                </Button>
              </HoverCardTrigger>
            </HoverCard>
          ))
        }
      </div>
      <canvas
        ref={canvasRef}
        width={350}
        height={350}
        onMouseDown={startPaint}
        onMouseUp={endPaint}
        onMouseMove={paint}
        className={`${isPainting ? 'custom-cursor' : 'cursor-pointer'} `}
      />
    </div>
  );
};

export default ImagePainter;
