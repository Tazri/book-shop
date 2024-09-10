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
    return "Name cannot start or end with space or dot.";
  }

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
