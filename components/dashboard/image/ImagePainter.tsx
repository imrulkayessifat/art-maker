import React, { useState, useRef, useEffect, MouseEvent, useCallback } from 'react';
import { CiSquarePlus, CiSquareMinus, CiSettings } from "react-icons/ci";
import { MdDraw } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import { IoArrowUndoCircleOutline, IoArrowRedoCircleOutline } from "react-icons/io5";
import { TbDragDrop2 } from "react-icons/tb";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from '@/components/ui/button';
import { ImagePainterProps, IconsProps, ScaleOffset } from '@/type/types';

const icons: IconsProps[] = [
  {
    react_icons: <CiSquarePlus className="w-7 h-7 cursor-pointer" />,
    content: 'Zoom In',
    canvasClick: 'zoomin'
  },
  {
    react_icons: <CiSquareMinus className="w-7 h-7 cursor-pointer" />,
    content: 'Zoom Out',
    canvasClick: 'zoomout'
  },
  {
    react_icons: <MdDraw className="w-7 h-7 cursor-pointer" />,
    content: 'Draw',
    canvasClick: 'draw'
  },
  {
    react_icons: <FaEraser className="w-7 h-7 cursor-pointer" />,
    content: 'Eraser',
    canvasClick: 'eraser'
  },
  {
    react_icons: <IoArrowUndoCircleOutline className="w-7 h-7 cursor-pointer" />,
    content: 'Undo',
    canvasClick: 'undo'
  },
  {
    react_icons: <IoArrowRedoCircleOutline className="w-7 h-7 cursor-pointer" />,
    content: 'Redo',
    canvasClick: 'redo'
  },
  {
    react_icons: <TbDragDrop2 className="w-7 h-7 cursor-pointer" />,
    content: 'Drag',
    canvasClick: 'drag'
  },
  {
    react_icons: <CiSettings className="w-7 h-7 cursor-pointer" />,
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

  const [canvasStates, setCanvasStates] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);

  const transparentCanvas = transparentCanvasRef.current;

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
    const transparentCanvas = transparentCanvasRef.current;

    if (!canvas || !transparentCanvas || !imageBuffer) {
      console.error('Canvas or image buffer not available.');
      return;
    }

    const ctx = canvas.getContext('2d');
    const transparentCtx = transparentCanvas.getContext('2d');
    if (!ctx || !transparentCtx) {
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
    transparentCtx.setTransform(scale, 0, 0, scale, panOffset.x, panOffset.y);

  }, [imageBuffer, scale, panOffset]);

  const startPaint = (event: MouseEvent<HTMLCanvasElement>) => {
    const cursorSize = 24;
    if (!transparentCanvas) return;

    if (canvasStates.length === 0) {
      pushCanvasState(transparentCanvas.toDataURL());
    }
    const { offsetX, offsetY } = event.nativeEvent;
    const scaledOffsetX = offsetX / scale;
    const scaledOffsetY = offsetY / scale;

    const startingX = scaledOffsetX + cursorSize / 2;
    const startingY = scaledOffsetY + cursorSize / 2;

    const transparentCtx = transparentCanvas.getContext('2d');
    if (!transparentCtx) return;

    transparentCtx.beginPath();
    transparentCtx.moveTo(startingX, startingY);
    setIsPainting(true);
  };

  const paintMove = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isPainting) return;
    const cursorSize = 21;
    if (!transparentCanvas) return;
    console.log("draw")

    const { offsetX, offsetY } = event.nativeEvent;
    const scaledOffsetX = offsetX / scale;
    const scaledOffsetY = offsetY / scale;

    const startingX = scaledOffsetX + cursorSize / 2;
    const startingY = scaledOffsetY + cursorSize / 2;

    const transparentCtx = transparentCanvas.getContext('2d');
    if (!transparentCtx) return;
    transparentCtx.strokeStyle = 'rgba(255, 255, 255, 1)';
    transparentCtx.lineWidth = 5;
    draw(transparentCtx, startingX, startingY);

  };

  const draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    console.log("draw")
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endPaint = () => {
    setIsPainting(false);
    pushCanvasState(transparentCanvasRef.current?.toDataURL() || '');
  };
  const startErase = (event: MouseEvent<HTMLCanvasElement>) => {
    const cursorSize = 24;

    if (!transparentCanvas) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const scaledOffsetX = offsetX / scale;
    const scaledOffsetY = offsetY / scale;

    const startingXE = scaledOffsetX + cursorSize / 2;
    const startingYE = scaledOffsetY + cursorSize / 2;

    const transparentCtx = transparentCanvas.getContext('2d');
    if (!transparentCtx) return;

    transparentCtx.beginPath();
    transparentCtx.moveTo(startingXE, startingYE);
    setIsErasing(true);
  };

  const eraseMove =(event: MouseEvent<HTMLCanvasElement>) => {
    if (!isErasing) return;

    const cursorSize = 21;
    if (!transparentCanvas) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const scaledOffsetX = offsetX / scale;
    const scaledOffsetY = offsetY / scale;

    const startingXE = scaledOffsetX + cursorSize / 2;
    const startingYE = scaledOffsetY + cursorSize / 2;

    const transparentCtx = transparentCanvas.getContext('2d');
    if (!transparentCtx) return;

    // eraser(ctxE, startingXE, startingYE)
    transparentCtx.clearRect(startingXE - 5, startingYE - 5, 12, 12);

  };

  const endErase = () => {
    setIsErasing(false);
    pushCanvasState(transparentCanvasRef.current?.toDataURL() || '');
  };

  const pushCanvasState = (dataURL: string) => {
    setCurrentStep((prevStep) => {
      const newStep = prevStep + 1;
      const newCanvasStates = canvasStates.slice(0, newStep);
      newCanvasStates.push(dataURL);
      setCanvasStates(newCanvasStates);
      return newStep;
    });
  };

  const handleUndo = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
    if (!transparentCanvas) return;
    const transparentCtx = transparentCanvas.getContext('2d');
    if (!transparentCtx) return;
    console.log(canvasStates[currentStep])
    if (currentStep >= 0) {
      const img = new Image();
      img.onload = () => {
        transparentCtx.clearRect(0, 0, transparentCanvas.width, transparentCanvas.height);
        transparentCtx.drawImage(img, 0, 0, transparentCanvas.width, transparentCanvas.height);
      };
      img.src = canvasStates[currentStep];
    }
  };

  const handleRedo = () => {
    if (currentStep < canvasStates.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
    if (!transparentCanvas) return;
    const transparentCtx = transparentCanvas.getContext('2d');
    if (!transparentCtx) return;
    if (currentStep < canvasStates.length) {
      const img = new Image();
      img.onload = () => {
        transparentCtx.clearRect(0, 0, transparentCanvas.width, transparentCanvas.height);
        transparentCtx.drawImage(img, 0, 0, transparentCanvas.width, transparentCanvas.height);
      };
      img.src = canvasStates[currentStep];
    }
  };

  const handleIconClick = useCallback((canvasClick: React.SetStateAction<string>) => {
    setCanvasFunctionality(canvasClick);
  }, []);

  return (
    <>
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
                    handleIconClick(icon.canvasClick)
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
      <div className='relative'>
        <div className='absolute top-[150px] left-0 z-2'>
          <canvas
            ref={canvasRef}
            width={350}
            height={350}
          />
        </div>
        <div className='absolute top-[150px] left-0 z-10'>
          <canvas
            ref={transparentCanvasRef}
            width={350}
            height={350}
            onMouseDown={(event) => {
              if (canvasFunctionality === 'draw') {
                startPaint(event);
              }
              else if (canvasFunctionality === 'eraser') {
                startErase(event)
              }
              else if (canvasFunctionality === 'undo') {
                handleUndo();
              }
              else if (canvasFunctionality === 'redo') {
                handleRedo();
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
              else if (canvasFunctionality === 'eraser') {
                endErase();
              }
              else if (isDragging && canvasFunctionality === 'drag') {
                setIsDragging(false);
              }
            }}
            onMouseMove={(event) => {
              if (canvasFunctionality === 'draw') {
                paintMove(event);
              }
              else if (canvasFunctionality === 'eraser') {
                eraseMove(event);
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
                canvasFunctionality === 'draw' ? 'custom-draw' :
                  canvasFunctionality === 'eraser' ? 'custom-eraser' :
                    canvasFunctionality === 'undo' ? 'cursor-alias' :
                      canvasFunctionality === 'redo' ? 'cursor-alias' :
                        canvasFunctionality === 'drag' ? 'cursor-move' :
                          'cursor-pointer'} `
            }
          />
        </div>
      </div>
    </>
  );
};

export default ImagePainter;