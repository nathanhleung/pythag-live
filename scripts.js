function round(num, places) {
	const factor = Math.pow(10, places);
	return (Math.round(num * factor) / factor);
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

let editOrder = [];
function calculate(e) {
  const target = e.target.id;
  editOrder = editOrder.filter((el) => {
  	if (el === target) {
    	return false;
    }
    return true;
  });
  editOrder.push(target);
  if (editOrder.length === 2) {
  	const unedited = ['a','b','c'].filter((el) => {
    	if (editOrder.indexOf(el) > -1) {
      	return false;
      }
      return true;
    });
    console.log(editOrder, unedited);
  	editOrder.unshift(unedited[0]);
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
  	switch (editOrder[0]) {
    	case 'a': {
      	const result = Math.sqrt(Math.pow(nums.c, 2) - Math.pow(nums.b, 2));
      	document.getElementById('a').value = round(result.toString(), 4);
        break;
      }
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
  }
  
  // get updated vals and fix widths
  vals = getVals();
  setWidth(vals);
}