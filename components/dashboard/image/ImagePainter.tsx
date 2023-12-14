import React, { useState, useRef, useEffect, MouseEvent } from 'react';

interface ImagePainterProps {
  imageBuffer: string | ArrayBuffer | null;
}

const ImagePainter: React.FC<ImagePainterProps> = ({ imageBuffer }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState<boolean>(false);

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
  }, [imageBuffer]);


  const startPaint = (event: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsPainting(true);
  };

  const paint = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isPainting) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const endPaint = () => {
    setIsPainting(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={350} 
      height={350}
      onMouseDown={startPaint}
      onMouseUp={endPaint}
      onMouseMove={paint}
    />
  );
};

export default ImagePainter;
