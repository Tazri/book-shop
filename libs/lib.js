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

export function generateJWTSecret(length = 100) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let secret = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    secret += charset[randomIndex];
  }
  return secret;
}

/**
 * Calculates the next and previous pages based on the total pages and the active page.
 *
 * @param {number} totalPages - The total number of pages.
 * @param {number} activePage - The current active page.
 * @returns {{nextPage,prevPage}} An object containing the `nextPage` and `prevPage`.
 */
export function getNextAndPrevPages(totalPages, activePage) {
  if (totalPages <= 0 || activePage <= 0 || activePage > totalPages) {
    return { nextPage: 1, prevPage: 1 };
  }

  const nextPage = activePage < totalPages ? activePage + 1 : totalPages;
  const prevPage = activePage > 1 ? activePage - 1 : 1;

  return { nextPage, prevPage };
}

export function generatePaginationLinks(
  path,
  activePage,
  totalPage,
  perPage,
  searchText = "",
  baseURLDefault = ""
) {
  const paginationArr = getPagination(totalPage, activePage, 1);
  const searchParams = new URLSearchParams();
  searchParams.set("perPage", perPage);

  if (searchText) {
    searchParams.set("search", searchText);
  }

  const baseURL = baseURLDefault
    ? baseURLDefault
    : process.env.NEXT_PUBLIC_BASE_URL;
  const links = [];

  for (const pageNumber of paginationArr) {
    if (!Number.isInteger(pageNumber)) {
      links.push("...");
      continue;
    }

    searchParams.set("page", pageNumber);
    const queryStr = searchParams.toString();
    const link = {
      page: pageNumber,
      link: baseURL + `${path}?` + queryStr,
    };

    if (activePage === pageNumber) {
      link.active = true;
    }

    links.push(link);
  }

  return links;
}
