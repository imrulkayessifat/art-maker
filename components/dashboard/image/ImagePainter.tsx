import React, { useCallback, MouseEvent, useEffect, useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import rough from 'roughjs';
import { BsThreeDots } from "react-icons/bs";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import axios from "axios";

import { ImagePainterProps, CursorStyles } from "@/type/types";

import { icons, iconsDropDown } from '@/lib/remix/icons';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast";


const ImagePainter: React.FC<ImagePainterProps> = ({ imageBuffer }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const transparentCanvasRef = useRef<HTMLCanvasElement>(null);
  const transparentCanvas = transparentCanvasRef.current;
  const maskingRef = useRef<HTMLCanvasElement>(null);
  const maskingCanvas = maskingRef.current;


  const [scale, setScale] = useState<number>(1);
  const [previousX, setPreviousX] = useState(0);
  const [previousY, setPreviousY] = useState(0);

  const [canvasStates, setCanvasStates] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);

  const [canvasFunctionality, setCanvasFunctionality] = useState<string>('default');
  const [isPainting, setIsPainting] = useState<boolean>(false);
  const [isErasing, setIsErasing] = useState<boolean>(false);

  const [drawSize, setDrawSize] = useState<number>(5);

  const [view, setView] = useState<boolean | null>(null);

  const transformComponentRef = useRef<ReactZoomPanPinchRef>(null);

  const [cursorStyles, setCursorStyles] = useState<CursorStyles>({
    'draw': 'custom-draw-5',
    'eraser': 'custom-eraser-5',
    'undo': 'cursor-alias',
    'redo': 'cursor-alias',
    'pan': 'cursor-pointer',
    'default': 'cursor-pointer'
  });

  const { toast } = useToast()

  useEffect(() => {

    setCursorStyles(prevState => ({
      ...prevState,
      draw: `custom-draw-${drawSize}`,
      eraser: `custom-eraser-${drawSize}`
    }));

  }, [drawSize])

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
    transparentCtx.lineJoin = 'round';
    transparentCtx.lineCap = "round";
    // transparentCtx.moveTo(startingX, startingY);
    setPreviousX(startingX);
    setPreviousY(startingY);

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
    transparentCtx.lineWidth = drawSize * 1.25;

    const rc = rough.canvas(transparentCanvas);
    rc.line(previousX, previousY, startingX,
      startingY, {
      stroke: 'rgba(255, 255, 255, 1)',
      strokeWidth: drawSize * 1.25,
      roughness: 0.5,
    });
    // draw(transparentCtx, startingX, startingY);

    /*implement QuadraticCurve For Line Smooth */

    // transparentCtx.quadraticCurveTo(previousX, previousY, startingX,startingY)
    // transparentCtx.stroke();

    setPreviousX(startingX);
    setPreviousY(startingY);
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

    transparentCtx.lineWidth = drawSize * 1.5;
    // transparentCtx.globalCompositeOperation = 'destination-out';
    // transparentCtx.clearRect(startingXE - 5, startingYE - 5, 12, 12);

    eraser(transparentCtx, startingXE, startingYE)

  };

  const eraser = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  }

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

  const applyMask = () => {
    if (!maskingCanvas || !transparentCanvas) return;

    const maskCtx = maskingCanvas.getContext('2d');
    const transparentCtx = transparentCanvas.getContext('2d');

    if (!maskCtx || !transparentCtx) return;

    maskCtx.fillStyle = 'black';
    maskCtx.fillRect(0, 0, maskingCanvas.width, maskingCanvas.height);

    maskCtx.drawImage(
      transparentCanvas,
      0,
      0,
      maskingCanvas.width,
      maskingCanvas.height
    );

    const imageData = maskCtx.getImageData(
      0,
      0,
      maskingCanvas.width,
      maskingCanvas.height
    );

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const isWhite =
        data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255;

      if (!isWhite) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 255;
      }
    }

    maskCtx.putImageData(imageData, 0, 0);

    console.log('Applied mask on maskingCanvas.');

  };

  const sendDataToAPI = async () => {
    console.log("hello")
    if (!maskingCanvas) return;
    console.log("hello")
    const imageCanvas = canvasRef.current;
    if (!imageCanvas) return;
    console.log("hello")

    const maskURL = maskingCanvas.toDataURL();
    const imageURL = imageCanvas.toDataURL();
    const data = {
      input: {
        mask: maskURL,
        image: imageURL
      }
    };
    try {
      const response = await axios.post('/api/image_remix', data, {
        headers: {
          'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`
        }
      });
      let url = new URL(response.data).toString();
      let shortDescription = url.length > 20 ? url.substring(0, 20) + '...' : url;
      toast({
        title: "Replicate Lama : Output ",
        description: `${shortDescription}`,
        action: <ToastAction onClick={() => {
          navigator.clipboard.writeText(response.data)
        }} altText="Copy">
          <IoCopyOutline className="w-7 h-7 cursor-pointer" />
        </ToastAction>,
      })
    } catch (error) {
      toast({
        title: "Replicate Lama : Error ",
        description: `${error}`,
        variant: "destructive"
      })
    }
  }

  return (
    <>
      <TransformWrapper
        initialScale={scale}
        panning={{ disabled: canvasFunctionality === 'draw' || canvasFunctionality === 'eraser', velocityDisabled: true }}
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
                    <HoverCardContent align="end" className="w-30 mt-5 bg-slate-900">
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
                          else if (icon.canvasClick === 'undo') {
                            handleUndo();
                          }
                          else if (icon.canvasClick === 'redo') {
                            handleRedo();
                          }
                          else if (icon.canvasClick === 'export') {
                            applyMask();
                            if (maskingCanvas) {
                              setView(true)
                            }
                          }
                          handleIconClick(icon.canvasClick)
                        }}
                        className={`px-1 ${icon.canvasClick === 'export' && currentStep === -1 ? 'cursor-not-allowed' : 'cursor-pointer'}`} variant={"outline"}
                        disabled={icon.canvasClick === 'export' && currentStep === -1}
                      >
                        {React.createElement(icon.react_icons, {
                          className: `w-7 h-7  ${canvasFunctionality === icon.canvasClick ? 'text-sky-500' : ''}`
                        })}
                      </Button>
                    </HoverCardTrigger>
                  </HoverCard>
                ))
              }
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="px-1" variant="outline">
                    <BsThreeDots className="w-7 h-7 cursor-pointer" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[70px] w-[70px]">
                  {
                    iconsDropDown.map((icon, i) => (
                      <DropdownMenuItem key={i}>
                        <HoverCard>
                          <HoverCardContent align="end" className="w-30 mt-5 bg-slate-900">
                            <div className="space-y-1 space-x-1">
                              <h5 className="text-sm text-white font-semibold">{icon.content}</h5>
                            </div>
                          </HoverCardContent>
                          <HoverCardTrigger asChild>
                            <Button
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation()
                                if (icon.canvasClick === 'default') {
                                  resetTransform();
                                }
                                else if (icon.canvasClick === 'brush+') {
                                  setDrawSize((prev) => Math.min(prev + 1, 10))
                                }
                                else if (icon.canvasClick === 'brush-') {
                                  setDrawSize((prev) => Math.max(prev - 1, 5))
                                }
                                else if (icon.canvasClick === 'generate') {
                                  sendDataToAPI();
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
                      </DropdownMenuItem>
                    ))
                  }
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="relative">
              <TransformComponent>
                <div className='relative grid place-items-center'>

                  <div className={`absolute ${view ? 'z-40' : 'z-10'}  top-0 left-0`}>
                    <canvas
                      ref={maskingRef}
                      width={360}
                      height={350}
                      className="rounded"
                    />
                  </div>

                  <div className='relative top-0 left-0 z-20'>
                    <canvas
                      ref={canvasRef}
                      width={360}
                      height={350}
                      className='rounded'
                    />
                  </div>
                  <div className='absolute top-0 left-0 z-30'>
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
                      className={`${cursorStyles[canvasFunctionality]} rounded `}
                    />
                  </div>



                </div>
              </TransformComponent>
              {
                view !== null && (
                  <>
                    <div className={`absolute ${view ? 'cursor-not-allowed' : 'cursor-pointer'} top-1/4 left-full z-5 ml-4`}>
                      <Button disabled={view} onClick={() => setView(true)} className={`rounded  px-1`} variant={"outline"}>
                        <FaArrowUp className="w-7 h-7 cursor-pointer" />
                      </Button>
                    </div>
                    <div className={`absolute ${!view ? 'cursor-not-allowed' : 'cursor-pointer'} top-2/4 left-full z-5 ml-4`}>
                      <Button disabled={!view} onClick={() => setView(false)} className={`rounded px-1`} variant={"outline"}>
                        <FaArrowDown className="w-7 h-7 cursor-pointer" />
                      </Button>
                    </div>
                  </>
                )
              }
            </div>
          </React.Fragment>
        )}
      </TransformWrapper>
    </>
  );
};

export default ImagePainter