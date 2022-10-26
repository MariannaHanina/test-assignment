const getInputsInfo = (inputs) => {
  const inputsAddresses = [];
  let sumInputsValue = 0;

  console.log('inputs', inputs);
  for (let input of inputs) {
    const { addr, value } = input.prev_out;
    inputsAddresses.push(addr);
    sumInputsValue += value;
  }

  return {
    inputsAddresses,
    sumInputsValue
  }
}

const getOutInfo = (outs) => {
  const outAddresses = [];
  let sumOutValue = 0;

  for (let out of outs) {
    const { addr, value } = out;
    outAddresses.push(addr);
    sumOutValue += value;
  }

  return {
    outAddresses,
    sumOutValue
  }
}

export const formatTransactionData = (transactionData) => {
  if (!transactionData.x) return false;
  const { inputs, out } = transactionData.x;
  const { inputsAddresses, sumInputsValue } = getInputsInfo(inputs);
  const { outAddresses, sumOutValue } = getOutInfo(out);
  const profit = sumInputsValue - sumOutValue;
 
  return {
    from: inputsAddresses,
    to: outAddresses,
    sum: profit
  }
}