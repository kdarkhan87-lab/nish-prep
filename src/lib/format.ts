/**
 * Форматирование дат без зависимости от ICU-данных браузера:
 * локаль kk-KZ в части браузеров отдаёт «M10» вместо названия месяца.
 */

const KK_MONTHS = [
  "қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым",
  "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан",
];

const RU_MONTHS = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/** «23 қазан, 19:33» */
export function formatDateTimeKk(input: string | Date): string {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${KK_MONTHS[d.getMonth()]}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** «23 қазан 2026» */
export function formatDateKk(input: string | Date): string {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${KK_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** «23 октября 2026» */
export function formatDateRu(input: string | Date): string {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${RU_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
