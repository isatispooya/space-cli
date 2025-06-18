/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
function numberToPersianWords(number: any) {
  const units = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
  const teens = [
    "ده",
    "یازده",
    "دوازده",
    "سیزده",
    "چهارده",
    "پانزده",
    "شانزده",
    "هفده",
    "هجده",
    "نوزده",
  ];
  const tens = [
    "",
    "",
    "بیست",
    "سی",
    "چهل",
    "پنجاه",
    "شصت",
    "هفتاد",
    "هشتاد",
    "نود",
  ];
  const scales = ["", "هزار", "میلیون", "میلیارد", "تریلیون"];

  if (number === 0) return "صفر";

  let result = "";
  let chunkIndex = 0;

  while (number > 0) {
    let chunk = number % 1000;
    if (chunk > 0) {
      let chunkStr = "";
      let hundred = Math.floor(chunk / 100);
      let ten = Math.floor((chunk % 100) / 10);
      let unit = chunk % 10;

      if (hundred > 0) {
        chunkStr += units[hundred] + " صد ";
      }
      if (ten > 0) {
        if (ten === 1 && unit > 0) {
          chunkStr += teens[unit] + " ";
          unit = 0;
        } else {
          chunkStr += tens[ten] + " ";
        }
      }
      if (unit > 0) {
        chunkStr += units[unit] + " ";
      }
      if (chunkStr.trim() !== "") {
        result =
          chunkStr.trim() +
          (scales[chunkIndex] ? " " + scales[chunkIndex] : "") +
          (result ? " و " : "") +
          result;
      }
    }
    number = Math.floor(number / 1000);
    chunkIndex++;
  }

  return result.trim();
}

export { numberToPersianWords };
