import axios from 'axios';

export const handleFormSubmit = async (e, url, type, body) => {
  e.preventDefault();
  if (type.toLowerCase() === 'get') {
    return await axios.get(url);
  }
  if (type.toLowerCase() === 'post') {
    return await axios.post(url, { ...body });
  }
  if (type.toLowerCase() === 'put') {
    return await axios.put(url, { ...body });
  }
  if (type.toLowerCase() === 'delete') {
    return await axios.delete(url);
  }
};

// assumes that the target element has starting top position and opacity of 0
export const fadeInFromTop = (elementRef, interval, duration, endPos) => {
  let start = Date.now();
  let timePassed = Date.now() - start;
  let positionCounter = 0;
  const frames = duration / interval;
  // Determine quantity that opacity must increment each frame in order tro reach 1 at end of interval
  const opacityIncrement = 1 / frames;
  const positionIncrement = endPos / frames;

  setInterval(() => {
    toggleNav();

    if (timePassed >= duration) {
      clearInterval();
      return;
    }
    // If nav is not visible,
    if (!isNavVisible) {
      // Will end at endPos
      elementRef.current.style.marginTop = positionCounter + 'px';
      elementRef.current.style.opcaity += opacityIncrement;
      positionCounter += positionIncrement;
    } else {
      // use endPos as starting point.
      navRef.current.style.marginTop = endPos;
      endPos -= 1;
    }
  }, interval);
};
