const delay = (timeout = 0) => {
  return (new Promise((resolve) => {
    window.setTimeout(resolve, timeout);
  }));
}

export default delay;