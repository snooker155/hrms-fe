export default function getYearDiff(date) {
  const now = new Date();
  const diff = new Date(now - new Date(date).getTime());
  return Math.abs(diff.getFullYear() - 1970);
}
