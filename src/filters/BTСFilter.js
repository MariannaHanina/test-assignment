const BTCFilter = (value) => {
  if (!value) return '';

  const satoshiInBTC = 100000000;
  const valueInBTC = value / satoshiInBTC

  return `${valueInBTC} BTC`;
}

export default BTCFilter;