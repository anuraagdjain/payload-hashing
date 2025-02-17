// TODO: new Date() is considered object and incorrectly returns undefined. 
// This leads to ',,' in the output string.
function isObject(obj){
    return typeof obj==='object' && !Array.isArray(obj) && obj !== null;
}


function payloadHashingImpl(obj,rootKey = null){
    let visitedKeys = [];
  Object.keys(obj).sort().forEach(key => {
    const childKey = rootKey === null ? key :  `${rootKey}.${key}`;
    const val = obj[key];
    if(isObject(val)){
      // recursion to generate the key for inner objects.
      visitedKeys.push(payloadHashingImpl(val,childKey));
    }else{
      if(Array.isArray(val)){
        // TODO: Handle array of mixed type. 
        // Currently it assumes array of objects is of same type.
        // Example: [{a:1},{a:2},{a:3}] is handled properly.
        // Example: [{a:1}, false,1,{c:2}] will not be handled properly.
        if(isObject(val[0])){
          val.forEach((v,index)=>{
            visitedKeys.push(payloadHashingImpl(v,`${childKey}[${index}]`));
          });
        }else{
          visitedKeys.push(`${childKey}:${val.sort().join()}`);
        }
      }else{
        visitedKeys.push(`${childKey}:${val}`);    
      }
    }
  });
  return visitedKeys.flat().join();
  }

  
  module.exports = payloadHashingImpl