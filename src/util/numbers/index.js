const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

class NumbersUtil {
  formatCurrency(value) {
    return currencyFormatter.format(value);
  }
}

export default new NumbersUtil();