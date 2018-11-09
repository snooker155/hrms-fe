import getCookie from './getCookie';

export default function checkCookies(cookieNames) {
  const cookies = { isValid: true };

  for (let i = 0; i < cookieNames.length; i++) {
    const cookieValue = getCookie(cookieNames[i]);
    if (cookieValue !== '') {
      cookies[cookieNames[i]] = cookieValue;
    } else {
      return { isValid: false };
    }
  }
  return cookies;
}
