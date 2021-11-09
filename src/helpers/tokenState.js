import jwtDecode from 'jwt-decode';

/**
 * 
 * Calculates if a token is within expiry time.
 * returns true if token is still within expiry time, false when expiration time is exceeded
 * @param {JwtPayload} jwtToken 
 * @returns {bool}
 */
export default function tokenState(jwtToken) {
    // Decode the json web token 
    const decodedToken = jwtDecode(jwtToken);
    // Get the expiry timestamp from the token
    const expirationTimeStamp = decodedToken.exp;
    // Get the current time in unix format just like the token timestamp 
    const currentTimeStamp = Math.floor(new Date().getTime() / 1000);

    return (expirationTimeStamp - currentTimeStamp) > 0
}