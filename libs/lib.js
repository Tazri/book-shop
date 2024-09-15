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
