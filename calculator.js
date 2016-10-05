function round(num, places) {
	const factor = Math.pow(10, places);
	const result = (Math.round(num * factor) / factor);
	return result;
}

function atanDeg(num) {
  const angle = Math.atan(num) * 180 / Math.PI;
  return round(angle, 3);
}

function getVals() {
	const vals = {
  	a: document.getElementById('a').value,
    b: document.getElementById('b').value,
    c: document.getElementById('c').value,
  };
  return vals;
}

function setWidth(vals) {
	const keys = Object.keys(vals);
	for (let i = 0; i < keys.length; i++) {
  	const el = document.getElementById(keys[i]);
    const chars = el.value.length;
    if (chars > 1) {
    	el.style.width = (chars * 2.5 + 2.5).toString() + 'rem';
    } else if (chars === 1) {
      el.style.width = '5rem';
    }
  }
}

let inactive = 'c';
function calculate(e) {
  const target = e.target.id;
  if (target === 'c') {
    inactive = 'b';
  } else {
    inactive = 'c';
  }
  
  let vals = getVals();
  
  const condition =
  	(vals.a !== '' && vals.b !== '') ||
    (vals.a !== '' && vals.c !== '') ||
    (vals.b !== '' && vals.c !== '');
    
  if (condition) {
  	const nums = {
    	a: Number(vals.a),
      b: Number(vals.b),
      c: Number(vals.c),
    };
    // update angles in infobox
    const angleA = MathJax.Hub.getAllJax("angle-a")[0];
    MathJax.Hub.Queue(["Text",angleA,atanDeg(nums.a / nums.b) + '^{\\circ}']);
    const angleB = MathJax.Hub.getAllJax("angle-b")[0];
    MathJax.Hub.Queue(["Text",angleB,atanDeg(nums.b / nums.a) + '^{\\circ}']);
  	switch (inactive) {
      case 'b': {
      	const result = Math.sqrt(Math.pow(nums.c, 2) - Math.pow(nums.a, 2));
      	document.getElementById('b').value = round(result.toString(), 4);
        break;
      }
      case 'c': {
        const result = Math.sqrt(Math.pow(nums.a, 2) + Math.pow(nums.b, 2));
        document.getElementById('c').value = round(result.toString(), 4);
        break;
      }
    }
  } else {
    const angleA = MathJax.Hub.getAllJax("angle-a")[0];
    MathJax.Hub.Queue(["Text",angleA,'0^{\\circ}']);
    const angleB = MathJax.Hub.getAllJax("angle-b")[0];
    MathJax.Hub.Queue(["Text",angleB,'0^{\\circ}']);
  }
  
  // get updated vals and fix widths
  vals = getVals();
  setWidth(vals);
}