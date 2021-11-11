import jwtDecode from 'jwt-decode';

/**
 * 
 * Calculates if a token is within expiry time.
 * returns true if token is still within expiry time, false when expiration time is exceeded
 * @param {JwtPayload} jwtToken 
 * @returns {bool}
 */
export default function tokenState(jwtToken) {
    // Decode the json web token & get the expiry timestamp from the token
    const { exp } = jwtDecode(jwtToken);
    // Get the current time in unix format just like the token timestamp 
    const currentTimeStamp = Math.floor(new Date().getTime() / 1000);
    // subtract the current date from the expiry date, the number we get is the the time left untill expiry
    // if the expiry time has already passed we will get a negative number and will return false
    return (exp - currentTimeStamp) > 0
}