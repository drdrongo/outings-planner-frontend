const jwtKey = process.env.REACT_APP_LOCALSTORAGE_AUTH_KEY;

export const getJwt = () => localStorage.getItem(jwtKey);

export const saveJwt = jwt => localStorage.setItem(jwtKey, jwt);

export const destroyJwt = () => localStorage.removeItem(jwtKey);
