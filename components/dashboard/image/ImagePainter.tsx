import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { CiSquarePlus, CiSquareMinus, CiSettings } from "react-icons/ci";
import { MdDraw } from "react-icons/md";
import { FaPaintBrush } from "react-icons/fa";
import { IoArrowUndoCircleOutline } from "react-icons/io5";
import { TbDragDrop2 } from "react-icons/tb";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from '@/components/ui/button';

interface ImagePainterProps {
  imageBuffer: string | ArrayBuffer | null;
}

interface IconsProps {
  react_icons: JSX.Element;
  content: string;
  canvasClick: string;
}

interface ScaleOffset {
  x: number;
  y: number;
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
  },
  {
    react_icons: <TbDragDrop2 className="w-8 h-8 cursor-pointer" />,
    content: 'Drag',
    canvasClick: 'drag'
  },
  {
    react_icons: <CiSettings className="w-8 h-8 cursor-pointer" />,
    content: 'Default',
    canvasClick: 'default'
  }
]

const ImagePainter: React.FC<ImagePainterProps> = ({ imageBuffer }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const transparentCanvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasFunctionality, setCanvasFunctionality] = useState<string>('default');
  const [isPainting, setIsPainting] = useState<boolean>(false);
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);

  const [panOffset, setPanOffset] = useState<ScaleOffset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const svgImage = `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="5" fill="white"/>
  </svg>
  `;

  const base64Image = btoa(svgImage);

  const maxScale = 1.4;
  const minScale = 1;

  const handleZoomIn = () => {
    setScale((prevScale) => {
      const newScale = parseFloat((prevScale + 0.1).toFixed(2));
      return newScale <= maxScale ? newScale : prevScale;
    });
  };

  const handleZoomOut = () => {
    setScale((prevScale) => {
      const newScale = parseFloat((prevScale - 0.1).toFixed(2));
      return newScale >= minScale ? newScale : prevScale;
    });
  };

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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    ctx.setTransform(scale, 0, 0, scale, panOffset.x, panOffset.y);

  }, [imageBuffer, scale, panOffset]);

  const startPaint = (event: MouseEvent<HTMLCanvasElement>) => {
    const cursorSize = 24;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const scaledOffsetX = offsetX / scale;
    const scaledOffsetY = offsetY / scale;

    const startingX = scaledOffsetX + cursorSize / 2;
    const startingY = scaledOffsetY + cursorSize / 2;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(startingX, startingY);
    setIsPainting(true);
  };

  const startErase = (event: MouseEvent<HTMLCanvasElement>) => {
    const cursorSize = 24;
    const canvas = transparentCanvasRef.current;
    if (!canvas) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const scaledOffsetX = offsetX / scale;
    const scaledOffsetY = offsetY / scale;

    const startingX = scaledOffsetX + cursorSize / 2;
    const startingY = scaledOffsetY + cursorSize / 2;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(startingX, startingY);
    setIsErasing(true);
  };

  const draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const eraser = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  };

  const paint = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isPainting) return;

    const cursorSize = 21;
    const canvas = transparentCanvasRef.current;
    if (!canvas) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const scaledOffsetX = offsetX / scale;
    const scaledOffsetY = offsetY / scale;

    const startingX = scaledOffsetX + cursorSize / 2;
    const startingY = scaledOffsetY + cursorSize / 2;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    ctx.lineWidth = 5;
    draw(ctx, startingX, startingY);

  };

  const erase = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isErasing) return;

    const cursorSize = 21;
    const canvas = transparentCanvasRef.current;
    if (!canvas) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const scaledOffsetX = offsetX / scale;
    const scaledOffsetY = offsetY / scale;

    const startingX = scaledOffsetX + cursorSize / 2;
    const startingY = scaledOffsetY + cursorSize / 2;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0)';
    ctx.lineWidth = 5;
    eraser(ctx, startingX, startingY)

  };

  const endPaint = () => {
    setIsPainting(false);
  };

  const endErase = () => {
    setIsErasing(false);
  };

  return (
    <div className='relative'>
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
      <div className='absolute top-[200px] left-100 z-2'>
        <canvas
          ref={canvasRef}
          width={350}
          height={350}
        />
      </div>
      <div className='absolute top-[200px] left-50 z-10'>
        <canvas
          ref={transparentCanvasRef}
          width={350}
          height={350}
          onMouseDown={(event) => {
            if (canvasFunctionality === 'draw') {
              startPaint(event);
            }
            else if (canvasFunctionality === 'brush') {
              startErase(event)
            }
            else if (canvasFunctionality === 'zoomin') {
              handleZoomIn();
            }
            else if (canvasFunctionality === 'zoomout') {
              handleZoomOut();
            }
            else if (canvasFunctionality === 'drag') {
              setIsDragging(true);
              lastPos.current = { x: event.clientX, y: event.clientY };
            }
          }}
          onMouseUp={(event) => {
            if (canvasFunctionality === 'draw') {
              endPaint();
            }
            else if (canvasFunctionality === 'brush') {
              endErase();
            }
            else if (isDragging && canvasFunctionality === 'drag') {
              setIsDragging(false);
            }

          }}
          onMouseMove={(event) => {
            if (canvasFunctionality === 'draw') {
              paint(event);
            }
            else if (canvasFunctionality === 'brush') {
              erase(event);
            }
            else if (isDragging && canvasFunctionality === 'drag') {
              const deltaX = event.clientX - lastPos.current.x;
              const deltaY = event.clientY - lastPos.current.y;

              setPanOffset((prevOffset) => ({
                x: prevOffset.x + deltaX / scale,
                y: prevOffset.y + deltaY / scale,
              }));

              lastPos.current = { x: event.clientX, y: event.clientY };
            }

          }}
          className={`${canvasFunctionality === 'zoomin' ? 'cursor-zoom-in' :
            canvasFunctionality === 'zoomout' ? 'cursor-zoom-out' :
              canvasFunctionality === 'draw' ? 'custom-cursor' :
                canvasFunctionality === 'brush' ? 'custom-cursor' :
                  canvasFunctionality === 'undo' ? 'cursor-alias' :
                    canvasFunctionality === 'drag' ? 'cursor-move' :
                      'cursor-pointer'} `
          }
        />
      </div>

    </div>
  );
};

export default ImagePainter;