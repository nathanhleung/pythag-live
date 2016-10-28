const PYTHAG_CANVAS = (() => {
  const { getVals, atanDeg } = PYTHAG_CALC;
  
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  // make sure width stays constant even when inputs grow
  canvas.style.width = canvas.offsetWidth.toString() + 'px';
  // coordinate system width
  const width = canvas.width;
  
  function updateCanvas() {
    // clear canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const vals = getVals();
    const valsArr = [vals.a,vals.b,vals.c];
    
    const condition = (vals.a !== '' && vals.b !== '' && vals.c !== '');
    
    if (condition) {
      // so scaled hypotenuse = width of canvas minus some padding
      const padding = 70;
      const scale = (width - padding) / vals.c;
      const sideLengths = valsArr.map((el) => {
        return el * scale;
      });
      
      const offsetBottom = (width - sideLengths[0]) / 2;
      const offsetLeft = (width - sideLengths[1]) / 2;
      
      // draw triangle
      ctx.beginPath();
      // right angle
      ctx.moveTo(offsetLeft, width - offsetBottom);
      // top angle
      ctx.lineTo(offsetLeft, width - sideLengths[0] - offsetBottom);
      // angle on right side (not right angle :P)
      ctx.lineTo(sideLengths[1] + offsetLeft, width - offsetBottom);
      // back to right angle
      ctx.lineTo(offsetLeft, width - offsetBottom);
      ctx.stroke();
      
      // draw labels
      let fontOffset = width / 18;
      const lineHeight = width / 25;
      ctx.font = `${lineHeight * 0.8}px Open Sans`;
      // Angles
      ctx.fillText('b', offsetLeft - fontOffset, width - sideLengths[0] - offsetBottom);
      ctx.fillText('a', sideLengths[1] + offsetLeft, width - offsetBottom + fontOffset);
      ctx.fillText('c', offsetLeft - fontOffset, width - offsetBottom + fontOffset);
      // Sides
      fontOffset = width / 16; // a little bigger offset for the angles
      ctx.fillText('B', (sideLengths[1]) / 2 + offsetLeft, width - offsetBottom + fontOffset);
      ctx.fillText('A', offsetLeft - fontOffset, width - (sideLengths[0] / 2) - offsetBottom);
      ctx.fillText('C', (sideLengths[1]) / 2 + offsetLeft + fontOffset, width - (sideLengths[0] / 2) - offsetBottom);
      // Information
      const textBoxSize = width / 3;
      ctx.fillText(`A: ${vals.a} units`, width - textBoxSize, 2 * lineHeight);
      ctx.fillText(`B: ${vals.b} units`, width - textBoxSize, 3 * lineHeight);
      ctx.fillText(`C: ${vals.c} units`, width - textBoxSize, 4 * lineHeight);
      // It's easier to just print this below the inputs
      /*
      ctx.fillText(`a = atan(A/B) = ${atanDeg(vals.a/vals.b)}°`, width - textBoxSize, 5 * lineHeight);
      ctx.fillText(`b = atan(B/A) = ${atanDeg(vals.b/vals.a)}°`, width - textBoxSize, 6 * lineHeight);
      ctx.fillText(`c = 90°`, width - textBoxSize, 7 * lineHeight);
      */
    }
  }
  return {
    updateCanvas,
  };
})();
