import {CheckLoginClient, IdentityUser, UserDTO} from "./EosAskApiFetch";

const Cookies = require('js-cookie');

// TODO: Change this url to not have localhost
export const LOGIN_URL = "https://localhost:5001/Identity/Account/Login";

const userClient = new CheckLoginClient();
const KEY_SIGN_IN = "signedInUser";
const COOKIE_REDIRECT = "loginRedirect";

let sessionStorage = window.sessionStorage || {
    getItem: () => {return null},
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
};

// retrieves the user if there is a login cookie;
// returns a null object otherwise
export function getSignedInUser() : UserDTO {
    let user = sessionStorage.getItem(KEY_SIGN_IN);
    if (!user) {
        return null;
    }
    
    return (JSON.parse(user));
}

export async function setSignedInUser() : Promise<UserDTO> {
    let user = await userClient.getLoginStatus();
    if (user && Object.keys(user).length > 0 && user.user.userName) {
        sessionStorage.setItem(KEY_SIGN_IN, JSON.stringify(user));
    }
    
    return user;
}

export function logout() {
    sessionStorage.removeItem(KEY_SIGN_IN);
}

export function isUserSignedIn() {
    return getSignedInUser() != null;
}

export async function isSignedIn(user : IdentityUser) {
    let signedIn = await getSignedInUser();
    if (!signedIn) {
        return false;
    }
    
    return signedIn.user.userName == user.userName
}

export function getPostSignInRedirectUrlAndRemove() {
    let redirectUrl = getPostSignInRedirectUrl();
    if (redirectUrl) {
        Cookies.remove(COOKIE_REDIRECT);
    }
    
    return redirectUrl;
}

export function getPostSignInRedirectUrl() {
    return Cookies.get(COOKIE_REDIRECT) || null;
}

export function setPostSignInRedirectUrl() {
    let currUrl = window.location.href;
    Cookies.set(COOKIE_REDIRECT, currUrl, {expires: 1}); // expires in 1 day
}

