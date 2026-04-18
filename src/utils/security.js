/**
 * Security utilities for the Aurora Management Portal.
 * Implements SHA-256 hashing and session management.
 */

/**
 * Hashes a string using SHA-256.
 * @param {string} string - The string to hash.
 * @returns {Promise<string>} - The hex representation of the hash.
 */
export const hashString = async (string) => {
    const msgBuffer = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

/**
 * Creates a secure session token with a timestamp.
 * @param {string} hash - The validation hash.
 * @returns {string} - Base64 encoded session token.
 */
export const createSessionToken = (hash) => {
    const session = {
        h: hash,
        t: Date.now()
    };
    return btoa(JSON.stringify(session));
};

/**
 * Validates a session token and checks for expiry.
 * @param {string} token - The session token from storage.
 * @param {number} expiryMinutes - Manual expiry time in minutes.
 * @returns {boolean} - True if session is valid and not expired.
 */
export const validateSession = (token, expiryMinutes = 20) => {
    if (!token) return false;
    try {
        const session = JSON.parse(atob(token));
        const now = Date.now();
        const expiryMs = expiryMinutes * 60 * 1000;
        
        if (now - session.t > expiryMs) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
};
