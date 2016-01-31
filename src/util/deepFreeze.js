import isObject from 'lodash.isobject';


// copy from MDN example: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#Examples
export default function deepFreeze(obj) {
  if (typeof Object.freeze !== 'function') {
    return obj;
  }

  if (!isObject(obj)) {
    return obj;
  }

  // Retrieve the property names defined on obj
  var propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  propNames.forEach(function(name) {
    var prop = obj[name];

    // Freeze prop if it is an object
    if (!!prop && typeof prop == 'object' && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });

  // Freeze self
  return Object.freeze(obj);
}
