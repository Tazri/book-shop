export function isDiffUnderMin(dateString, minute = 3) {
  const targetDate = new Date(dateString);
  const nowDate = Date.now();
  const diffInMilli = nowDate - targetDate;
  const diffInMinute = diffInMilli / (1000 * 60);

  if (diffInMinute < minute) {
    return true;
  } else {
    return false;
  }
}

export function minToMili(minute) {
  return minute * 60 * 1000;
}

export function miliToMinSecString(miliSec) {
  const sec = Math.ceil(miliSec / 1000);
  const leftSec = sec % 60;
  const minute = sec / 60;
  return `${minute}min ${leftSec}sec`;
}

export function getDiffFromTwoDateInMinAndSec(fromDate, toDate = Date.now()) {
  const diff = toDate - fromDate;
  const sec = Math.ceil(diff / 60);
  const min = Math.floor(sec / 60);
  const leftSec = sec % 60;
  return [min, leftSec];
}

export function getDiffFromTwoDateInMinAndSecStr(
  fromDate,
  toDate = Date.now()
) {
  const [min, leftSec] = getDiffFromTwoDateInMinAndSec(fromDate, toDate);
  return `${min}min ${leftSec}sec`;
}

export function miliToMinSec(miliSec) {
  const sec = Math.ceil(miliSec / 1000);
  const min = Math.floor(sec / 60);
  const leftSec = sec % 60;
  return [min, leftSec];
}

export function minSecStringFromSec(sec) {
  const min = Math.floor(sec / 60);
  const leftSec = sec % 60;

  let str = "";

  if (min) {
    str += `${min}min`;
  }
  if (leftSec) {
    str = str ? str + ` ${leftSec}sec` : `${leftSec}sec`;
  }
  return str;
}

export function getDateDDMonthYYYY(dateISO) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(dateISO);

  const day = String(date.getDate()).padStart(2, "0"); // Ensures day is 2 digits
  const month = months[date.getMonth()]; // Get 3-char month name
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
