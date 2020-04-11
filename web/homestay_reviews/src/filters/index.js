export function imgLoad (target, type) {
  if (typeof (target) === 'string') {
    return `./static/images/${target}`
  } else if (typeof (target) === 'object') {
    Object.keys(target).map(key => {
      if (key === 'img') {
        target.backgroundImage = `url(./static/images/${target.img})`
        target.backgroundSize = `100% 100%`
      }
    })
    return target
  } else {
    return {}
  }
}


