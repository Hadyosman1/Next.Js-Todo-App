export default function dateFormat(date: Date) {
  const dateString = date.toString();
  return dateString.slice(0, dateString.indexOf("GMT"));
}
