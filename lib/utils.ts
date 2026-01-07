export const formatCurrency = (priceInBgn: number): string => {
  const priceInEur = priceInBgn / 1.95583;
  return `€${priceInEur.toFixed(2)} (${priceInBgn.toFixed(2)} лв.)`;
};