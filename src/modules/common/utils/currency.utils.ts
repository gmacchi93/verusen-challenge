export const currencyFormatter = (value?: number) => {
  if (value == null) {
    return "";
  }
  return `$${value.toLocaleString()}`;
};
