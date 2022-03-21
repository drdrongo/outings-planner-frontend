const jwtKey = 'outings_jwt';

export const getJwt = () => localStorage.getItem(jwtKey);

export const saveJwt = jwt => localStorage.setItem(jwtKey, jwt);

export const destroyJwt = () => localStorage.removeItem(jwtKey);
