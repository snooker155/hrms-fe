export default function getLateDate(degree) {
  if (degree.every(degree => degree.date === null)) {
    return '—';
  }

  return new Date(degree.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date).toLocaleDateString();
}
