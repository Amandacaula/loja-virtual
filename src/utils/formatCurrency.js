const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (value) => formatter.format(Number(value) || 0);
