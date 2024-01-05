export const sizes = {
  mobile: `425px`,
  tablet: `768px`,
  desktop: `1024px`,
};

export const media = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
  (accumulator, size) => {
    accumulator[size] = `@media (max-width: ${sizes[size]})`;
    return accumulator;
  },
  {} as {[key in keyof typeof sizes]:string} 
);
