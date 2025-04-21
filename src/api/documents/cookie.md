Cookie Management Utility
This utility provides functions to manage cookies in a web application, with support for secure cookie prefixes (__Secure- and __Host-) when running over HTTPS. The functions handle setting, retrieving, and removing cookies with customizable options for expiration and security.
Features

Set Cookies: Create cookies with configurable expiration times and secure prefixes.
Get Cookies: Retrieve cookie values by name, accounting for secure prefixes.
Remove Cookies: Delete cookies by setting an expired date.
Security: Automatically applies __Secure- or __Host- prefixes for HTTPS connections, along with Secure and SameSite=Lax attributes.
Flexibility: Supports both HTTP and HTTPS environments, with optional __Host- prefix for enhanced security.

Functions
setCookie(cname: string, cvalue: string, exMinutes: number, isHostPrefix: boolean = false): void
Sets a cookie with the specified name, value, and expiration time (in minutes).

Parameters:
cname: The name of the cookie.
cvalue: The value of the cookie.
exMinutes: Expiration time in minutes from the current time.
isHostPrefix: If true and running over HTTPS, prefixes the cookie name with __Host- (requires Secure and no Domain attribute). Otherwise, uses __Secure- for HTTPS.


Behavior:
Sets the cookie with Path=/, SameSite=Lax, and Secure (if HTTPS).
Calculates expiration based on the provided minutes.
Applies __Host- or __Secure- prefix for HTTPS connections.



getCookie(cname: string, isHostPrefix: boolean = false): string | null
Retrieves the value of a cookie by its name.

Parameters:
cname: The name of the cookie.
isHostPrefix: If true and running over HTTPS, looks for a cookie with __Host- prefix. Otherwise, uses __Secure- for HTTPS.


Returns:
The cookie value as a string, or null if the cookie is not found.


Behavior:
Decodes the cookie string and searches for the specified cookie name, accounting for prefixes.



removeCookie(cname: string, isHostPrefix: boolean = false): void
Removes a cookie by setting its expiration to a past date.

Parameters:
cname: The name of the cookie.
isHostPrefix: If true and running over HTTPS, targets a cookie with __Host- prefix. Otherwise, uses __Secure- for HTTPS.


Behavior:
Sets the cookie’s expiration to January 1, 1970, effectively deleting it.
Maintains Path=/, SameSite=Lax, and Secure (if HTTPS) attributes.



Security Considerations

HTTPS Support: When the page is loaded over HTTPS, cookies are automatically prefixed with __Secure- or __Host- (if isHostPrefix is true) and include the Secure attribute to ensure they are only sent over secure connections.
SameSite=Lax: All cookies are set with SameSite=Lax to mitigate cross-site request forgery (CSRF) attacks.
Host Prefix: The __Host- prefix (when isHostPrefix is true) ensures cookies are tied to the origin and cannot be set for subdomains, providing stronger security for sensitive data.
No Domain Attribute: Cookies are scoped to the current domain by default (no Domain attribute), reducing the risk of unintended access.

Usage Example
// Set a cookie that expires in 30 minutes
setCookie("user", "john_doe", 30);

// Set a secure cookie with __Host- prefix (HTTPS only)
setCookie("session", "abc123", 60, true);

// Get a cookie value
const user = getCookie("user"); // Returns "john_doe" or null
const session = getCookie("session", true); // Looks for __Host-session

// Remove a cookie
removeCookie("user");
removeCookie("session", true);

Notes

The utility assumes modern browser support for SameSite and Secure attributes.
The __Host- prefix requires HTTPS and no Domain attribute; it’s ideal for high-security cookies.
Cookie values should be properly encoded if they contain special characters (handled automatically by document.cookie for setting, and decodeURIComponent for retrieval).
The expiration time for setCookie is specified in minutes for simplicity, converted internally to milliseconds.

Limitations

Does not support custom Domain or SameSite values (fixed to SameSite=Lax).
Assumes Path=/ for all cookies, which may not suit all use cases.
No support for HTTP-only cookies, as this utility is client-side JavaScript.

