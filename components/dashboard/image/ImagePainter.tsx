import React, { useState, useRef, useEffect, MouseEvent } from 'react';

interface ImagePainterProps {
  imageBuffer: string | ArrayBuffer | null;
}

const ImagePainter: React.FC<ImagePainterProps> = ({ imageBuffer }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState<boolean>(false);

  const svgImage = `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" fill="white"/>
  </svg>
  `;

  const base64Image = btoa(svgImage);
  console.log(base64Image);

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

    ctx.strokeStyle = 'white'; // Set the paint color to white
    ctx.lineWidth = 5;

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
      className='custom-cursor'
    />
  );
};

export default ImagePainter;
