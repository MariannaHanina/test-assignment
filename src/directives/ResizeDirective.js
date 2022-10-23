let ro = null;

export default {
  inserted(el, binding) {
    const callback = binding.value;
    ro = new ResizeObserver(([entry]) => {
      const { contentRect } = entry;
      const { height, width } = contentRect;
      
      callback({
        height: height,
        width: width
      })
    });
    ro.observe(el);
  },
  unbind(el) {
    ro.unobserve(el);
  }
};