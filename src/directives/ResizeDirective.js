function inserted (el, binding) {
  const callback = binding.value;
  this.ro = new ResizeObserver(([entry]) => {
    const { contentRect } = entry;
    const { height, width } = contentRect;
    
    callback({
      height: height,
      width: width
    })
  });
  this.ro.observe(el);
}

function unbind(el) {
  this.ro.unobserve(el);
}

const ResizeDirective = {
  ro: null
};
ResizeDirective.inserted = inserted.bind(ResizeDirective);
ResizeDirective.unbind = unbind.bind(ResizeDirective);

export default ResizeDirective;