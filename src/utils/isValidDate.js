function isValidDate(givenDate) {
  const { day, month, year } = givenDate;
  let dateString =
    year.toString() +
    "-" +
    ("0" + month.toString()).slice(-2) +
    "-" +
    ("0" + day.toString()).slice(-2);
  let regEx = /^(?:(?:(?:(?:(?:[13579][26]|[2468][048])00)|(?:[0-9]{2}(?:(?:[13579][26])|(?:[2468][048]|0[48]))))-(?:(?:(?:09|04|06|11)-(?:0[1-9]|1[0-9]|2[0-9]|30))|(?:(?:01|03|05|07|08|10|12)-(?:0[1-9]|1[0-9]|2[0-9]|3[01]))|(?:02-(?:0[1-9]|1[0-9]|2[0-9]))))|(?:[0-9]{4}-(?:(?:(?:09|04|06|11)-(?:0[1-9]|1[0-9]|2[0-9]|30))|(?:(?:01|03|05|07|08|10|12)-(?:0[1-9]|1[0-9]|2[0-9]|3[01]))|(?:02-(?:[01][0-9]|2[0-8])))))$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  let d = new Date(year, month - 1, day);
  let dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return (
    (d.getDate() === parseInt(day, 10) || d.getDate() === day) &&
    d.getMonth() === month - 1 &&
    (d.getFullYear() === year || d.getFullYear() === parseInt(year, 10))
  );
}

export default isValidDate;
