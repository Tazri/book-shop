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
    return "Please enter your new password.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!pattern.test(password)) {
    return "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character";
  }

  if (password.length > 128) {
    return "Password must be under 128 characters.";
  }

  return "";
}
