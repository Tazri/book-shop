import bcrypt from "bcrypt";

export function getPagination(lastPage, activePage, delta = 2) {
  const pagination = [];

  const range = {
    start: Math.max(2, activePage - delta),
    end: Math.min(lastPage - 1, activePage + delta),
  };

  pagination.push(1);

  if (range.start > 2) {
    pagination.push("...");
  }

  for (let i = range.start; i <= range.end; i++) {
    pagination.push(i);
  }

  if (range.end < lastPage - 1) {
    pagination.push("...");
  }

  if (lastPage > 1) {
    pagination.push(lastPage);
  }

  return pagination;
}

export function getDiscountedPrice(price, discount) {
  const result = price - (price / 100) * discount;
  return result;
}

export function generateOTP() {
  const digit1 = Math.ceil(Math.random() * 9);
  const digit2 = Math.ceil(Math.random() * 9);
  const digit3 = Math.ceil(Math.random() * 9);
  const digit4 = Math.ceil(Math.random() * 9);
  return `${digit1}${digit2}${digit3}${digit4}`;
}

export async function hashPassword(password, saltRound = 10) {
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
