import React, { useCallback, MouseEvent, useEffect, useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
  ReactZoomPanPinchState,
} from "react-zoom-pan-pinch";

import { ImagePainterProps } from "@/type/types";

import { icons } from '@/lib/remix/icons';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";


const ImagePainter: React.FC<ImagePainterProps> = ({ imageBuffer }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const transparentCanvasRef = useRef<HTMLCanvasElement>(null);
  const transparentCanvas = transparentCanvasRef.current;

  const [scale, setScale] = useState<number>(1);

  const [canvasStates, setCanvasStates] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);

  const [canvasFunctionality, setCanvasFunctionality] = useState<string>('default');
  const [isPainting, setIsPainting] = useState<boolean>(false);
  const [isErasing, setIsErasing] = useState<boolean>(false);

  const transformComponentRef = useRef<ReactZoomPanPinchRef>(null);


  const handleIconClick = useCallback((canvasClick: React.SetStateAction<string>) => {
    setCanvasFunctionality(canvasClick);
  }, []);

  const pushCanvasState = (dataURL: string) => {
    setCurrentStep((prevStep) => {
      const newStep = prevStep + 1;
      const newCanvasStates = canvasStates.slice(0, newStep);
      newCanvasStates.push(dataURL);
      setCanvasStates(newCanvasStates);
      return newStep;
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

  }, [imageBuffer]);

  const startPaint = (event: MouseEvent<HTMLCanvasElement>) => {
    const cursorSize = 24;
    if (!transparentCanvas) return;

    if (canvasStates.length === 0) {
      pushCanvasState(transparentCanvas.toDataURL());
    }

    const transparentCtx = transparentCanvas.getContext('2d');
    if (!transparentCtx) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const originalPoint = new DOMPoint(offsetX, offsetY);
    const currentTransformedCursor = transparentCtx.getTransform().invertSelf().transformPoint(originalPoint);
    const scaledOffsetX = currentTransformedCursor.x * scale;
    const scaledOffsetY = currentTransformedCursor.y * scale;
    const startingX = (scaledOffsetX + (cursorSize / 2)) / scale;
    const startingY = (scaledOffsetY + (cursorSize / 2)) / scale;

    transparentCtx.beginPath();
    transparentCtx.moveTo(startingX, startingY);
    setIsPainting(true);
  };

  const paintMove = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isPainting) return;
    const cursorSize = 24;
    if (!transparentCanvas) return;

    const transparentCtx = transparentCanvas.getContext('2d');
    if (!transparentCtx) return;
    const { offsetX, offsetY } = event.nativeEvent;
    const originalPoint = new DOMPoint(offsetX, offsetY);
    const currentTransformedCursor = transparentCtx.getTransform().invertSelf().transformPoint(originalPoint);
    const scaledOffsetX = currentTransformedCursor.x * scale;
    const scaledOffsetY = currentTransformedCursor.y * scale;
    const startingX = (scaledOffsetX + (cursorSize / 2)) / scale;
    const startingY = (scaledOffsetY + (cursorSize / 2)) / scale;

    transparentCtx.strokeStyle = 'rgba(255, 255, 255, 1)';
    transparentCtx.lineWidth = 5;
    draw(transparentCtx, startingX, startingY);
  };

  const draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
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

    const transparentCtx = transparentCanvas.getContext('2d');
    if (!transparentCtx) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const originalPoint = new DOMPoint(offsetX, offsetY);
    const currentTransformedCursor = transparentCtx.getTransform().invertSelf().transformPoint(originalPoint);
    const scaledOffsetX = currentTransformedCursor.x * scale;
    const scaledOffsetY = currentTransformedCursor.y * scale;
    const startingXE = (scaledOffsetX + (cursorSize / 2)) / scale;
    const startingYE = (scaledOffsetY + (cursorSize / 2)) / scale;

    transparentCtx.beginPath();
    transparentCtx.moveTo(startingXE, startingYE);
    setIsErasing(true);
  };

  const eraseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isErasing) return;

    const cursorSize = 21;
    if (!transparentCanvas) return;

    const transparentCtx = transparentCanvas.getContext('2d');
    if (!transparentCtx) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const originalPoint = new DOMPoint(offsetX, offsetY);
    const currentTransformedCursor = transparentCtx.getTransform().invertSelf().transformPoint(originalPoint);
    const scaledOffsetX = currentTransformedCursor.x * scale;
    const scaledOffsetY = currentTransformedCursor.y * scale;
    const startingXE = (scaledOffsetX + (cursorSize / 2)) / scale;
    const startingYE = (scaledOffsetY + (cursorSize / 2)) / scale;

    // eraser(ctxE, startingXE, startingYE)
    transparentCtx.clearRect(startingXE - 5, startingYE - 5, 12, 12);

  };

  const endErase = () => {
    setIsErasing(false);
    pushCanvasState(transparentCanvasRef.current?.toDataURL() || '');
  };

  const handleUndo = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
    if (!transparentCanvas) return;
    const transparentCtx = transparentCanvas.getContext('2d');
    if (!transparentCtx) return;
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

  return (
    <>
      <TransformWrapper
        initialScale={scale}
        panning={{ disabled: canvasFunctionality !== 'pan', velocityDisabled: true }}
        doubleClick={{ disabled: true }}
        onTransformed={(e) => {
          setScale(e.instance.transformState.scale)
        }}
        initialPositionX={0}
        initialPositionY={0}
        ref={transformComponentRef}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <div className='flex justify-start gap-2 pb-3'>
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
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation()
                          if (icon.canvasClick === 'zoomin') {
                            zoomIn();
                          }
                          else if (icon.canvasClick === 'zoomout') {
                            zoomOut();
                          }
                          else if (icon.canvasClick === 'default') {
                            resetTransform();
                          }
                          handleIconClick(icon.canvasClick)
                        }}
                        className='px-1' variant={"outline"}
                      >
                        {React.createElement(icon.react_icons, {
                          className: `w-7 h-7 cursor-pointer ${canvasFunctionality === icon.canvasClick ? 'text-sky-500' : ''}`
                        })}
                      </Button>
                    </HoverCardTrigger>
                  </HoverCard>
                ))
              }
            </div>
            <TransformComponent>
              <div className='relative grid place-items-center'>
                <div className='relative top-0 left-0 z-2'>
                  <canvas
                    ref={canvasRef}
                    width={360}
                    height={350}
                    className='rounded'
                  />
                </div>
                <div className='absolute top-0 left-0 z-3'>
                  <canvas
                    ref={transparentCanvasRef}
                    width={360}
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

                    }}
                    onMouseMove={(event) => {
                      if (canvasFunctionality === 'draw') {
                        paintMove(event);
                      }
                      else if (canvasFunctionality === 'eraser') {
                        eraseMove(event);
                      }
                    }}
                    onMouseUp={() => {
                      if (canvasFunctionality === 'draw') {
                        endPaint();
                      }
                      else if (canvasFunctionality === 'eraser') {
                        endErase();
                      }
                    }}
                    className={`${canvasFunctionality === 'draw' ? 'custom-draw' :
                      canvasFunctionality === 'eraser' ? 'custom-eraser' :
                        canvasFunctionality === 'undo' ? 'cursor-alias' :
                          canvasFunctionality === 'redo' ? 'cursor-alias' :
                            canvasFunctionality === 'pan' ? 'cursor-pointer' :
                              'cursor-default'} rounded`
                    }
                  />
                </div>
              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </>
  );
};

export default ImagePainter