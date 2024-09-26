export function isValidPhoneNumber(number) {
  const pattern = /^(\+?88)?01\d{9}$/;
  if (number.match(pattern)) {
    return "";
  } else {
    return "Please enter valid number";
  }
}

export function isValidEmail(email) {
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return "";
  } else {
    return "Please enter valid email.";
  }
}

export function isValidName(name) {
  if (/^[ .]|[ .]$/.test(name)) {
    return "Name cannot start or end with dot and space.";
  }

  // if (/\s.\s/.test(name)) {
  //   return "Dot used only with character.";
  // }

  if (/[.]{2,}/.test(name)) {
    return "Name cannot contain consecutive dots.";
  }

  if (/[ ]{2,}/.test(name)) {
    return "Name cannot contain consecutive spaces.";
  }

  if (/[^a-zA-Z .]/.test(name)) {
    return "Name can only contain alphabetic characters, spaces, and dots.";
  }

  if (name.length < 5 || name.length > 16) {
    return "Name must be between 5 to 16 characters and alphanumeric.";
  }

  return "";
}

export function isValidPassword(password) {
  if (password.length === 0) {
    return "Please enter valid password.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  // check digits
  const digits = "0123456789";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = lowercase.toUpperCase();
  let isDigitFound = false;
  let isLowerCaseFound = false;
  let isUpperCaseFound = false;
  let isSpecialCaseFound = false;

  for (const char of password) {
    if (digits.includes(char)) isDigitFound = true;

    if (lowercase.includes(char)) isLowerCaseFound = true;

    if (uppercase.includes(char)) isUpperCaseFound = true;

    if (
      !digits.includes(char) &&
      !lowercase.includes(char) &&
      !uppercase.includes(char)
    ) {
      isSpecialCaseFound = true;
    }

    if (
      isDigitFound &&
      isLowerCaseFound &&
      isUpperCaseFound &&
      isSpecialCaseFound
    )
      break;
  }

  if (!isLowerCaseFound) {
    return "Password must include at least 1 lowercase alphabet.";
  }

  if (!isUpperCaseFound) {
    return "Password must include at least 1 uppercase alphabet.";
  }

  if (!isDigitFound) {
    return "Password must include at least 1 digit.";
  }

  if (!isSpecialCaseFound) {
    return "Password must include at least 1 special case.";
  }

  if (password.length > 128) {
    return "Password must be under 128 characters.";
  }

  return "";
}

export function isValidUsername(username) {
  if (!username) {
    return "Please provide username.";
  }
  const legalCharacters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.";

  for (const char of username) {
    if (!legalCharacters.includes(char)) {
      return "Username only contain alphabet, digits and dot(.).";
    }
  }

  if (username.length < 5) {
    return "Username must be at least 5 characters long.";
  }

  if (username.length > 20) {
    return "Username must be less than or equal 20 characters.";
  }

  return "";
}
