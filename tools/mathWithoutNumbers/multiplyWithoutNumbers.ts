export default (x: string, y: string) => {
  let product = "";
  for (const _element of y) {
    for (const element of x) {
      product += element;
    }
  }

  return product;
};
