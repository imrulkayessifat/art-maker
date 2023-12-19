const svgDraw = `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="5" fill="white"/>
  </svg>
  `;

const base64Draw = btoa(svgDraw);

const svgEraser = `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="5" stroke="black"/>
  </svg>
  `;

const base64Eraser = btoa(svgEraser);