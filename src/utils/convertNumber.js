function convertToNumber(inputString) {
  // Try to convert the string to a number
  const number = Number(inputString);

  // Check if it's a valid number
  if (isNaN(number)) {
    return "Error: The input is not a valid number.";
  }
  return number;
}

export default convertToNumber;
