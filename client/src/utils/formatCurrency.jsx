const formatCurrency = (value = 0) => {
  return `₹${Number(value).toLocaleString("en-IN")}`;
};

export default formatCurrency;