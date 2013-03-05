var I = function (x) { return x }

// loop unrolled, see: http://jsperf.com/descendents
function dotMap(path) {
  if (typeof path !== 'string' || path.length === 0) {
    return I
  }
  var segments = path.split('.')
  var len = segments.length

  switch (len) {
    case 0: return I
    case 1: return function (x) {
        return x[segments[0]]
      }
    case 2: return function (x) {
        return x[segments[0]][segments[1]]
      }
    case 3: return function (x) {
        return x[segments[0]][segments[1]][segments[2]]
      }
    case 4: return function (x) {
      return x[segments[0]][segments[1]][segments[2]][segments[3]]
    }
  }
  return function (x) {
    var i
    while(i = segments.shift(), x = x[i], segments.length);
    return x;
  }
}

function safe(path) {
  var map = dotMap(path)
  return function (x) {
    try {
      return map(x)
    } catch (e) {}
  }
}

function get(obj, path) {
  return safe(path)(obj)
}

module.exports = dotMap
module.exports.safe = safe
module.exports.get = get