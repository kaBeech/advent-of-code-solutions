export default (x: string[], y: string[]) => {
  const product: string[] = [];
  for (const _element of y) {
    for (const element of x) {
      product.push(element);
    }
  }

  return product;
};
