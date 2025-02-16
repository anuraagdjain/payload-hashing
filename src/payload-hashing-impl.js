function isObject(obj){
    return typeof obj==='object' && !Array.isArray(obj) && obj !== null;
  }
  
  // nested object -> array
function payloadHashingImpl(obj,rootKey = null){
    let visitedKeys = [];
  Object.keys(obj).sort().forEach(key => {
    const childKey = rootKey === null ? key :  `${rootKey}.${key}`;
    const val = obj[key];
    if(isObject(val)){
      // recursion to generate the array for inner objects.
      visitedKeys.push(payloadHashingImpl(val,childKey));
    }else{
      // TODO: Array of objects are not supported yet.
      const fval = Array.isArray(val) ? val.sort().join() : val;
      // console.log('fval',fval,val);
      visitedKeys.push(`${childKey}:${fval}`);  
    }
  });
  return visitedKeys.flat().join();
  }

  
  module.exports = payloadHashingImpl