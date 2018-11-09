export default function decodePassword(str) {
  let h = 0, l = str.length, i = 0;
  if ( l > 0 ) {
    while (i < l) {
      h = (h << 5) - h + str.charCodeAt(i++) | 0;
    }
  }
  return h.toString();
}
