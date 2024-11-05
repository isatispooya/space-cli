export function setCookie(
  cname: string,
  cvalue: string,
  exMinutes: number,
  isHostPrefix: boolean = false
): void {
  const d = new Date();
  d.setTime(d.getTime() + exMinutes * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;

  let cookieName = cname;
  const isHttps = window.location.protocol === "https:";

  if (isHostPrefix && isHttps) {
    cookieName = `__Host-${cname}`;
  } else if (isHttps) {
    cookieName = `__Secure-${cname}`;
  }

  const secureFlag = isHttps ? ";Secure" : "";
  const sameSiteFlag = ";SameSite=Lax";
  const pathFlag = ";Path=/";

  document.cookie = `${cookieName}=${cvalue};${expires}${pathFlag}${secureFlag}${sameSiteFlag}`;
}

export function getCookie(
  cname: string,
  isHostPrefix: boolean = false
): string | null {
  const isHttps = window.location.protocol === "https:";
  let cookieName = cname;

  if (isHostPrefix && isHttps) {
    cookieName = `__Host-${cname}`;
  } else if (isHttps) {
    cookieName = `__Secure-${cname}`;
  }

  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(";");

  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i].trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }
  return null;
}
