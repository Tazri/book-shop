export function isValidPhoneNumber(number) {
  const pattern = /^(\+?88)?01\d{9}$/;
  if (number.match(pattern)) {
    return "";
  } else {
    return "Please enter valid number";
  }
}
