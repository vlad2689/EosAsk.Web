import {CheckLoginClient, IdentityUser, UserDTO} from "./EosAskApiFetch";

const Cookies = require('js-cookie');

// TODO: Change this url to not have localhost
export const LOGIN_URL = "https://localhost:5001/Identity/Account/Login";

const userClient = new CheckLoginClient();
const KEY_SIGN_IN = "signedInUser";
const COOKIE_LOGIN = ".AspNetCore.Identity.Application";
const COOKIE_REDIRECT = "loginRedirect";

let sessionStorage = window.sessionStorage || {
    getItem: () => {return null},
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
};

// retrieves the user if there is a login cookie;
// returns a null object otherwise
export async function getSignedInUser() : Promise<UserDTO> {
    if (!isUserSignedIn()) {
        return null;
    }
    let user = sessionStorage.getItem(KEY_SIGN_IN);
    if (!user) {
        user = await userClient.getLoginStatus();
        sessionStorage.setItem(KEY_SIGN_IN, JSON.stringify(user));
        return user;
    }
    
    return (JSON.parse(user));
}

export function logout() {
    Cookies.remove(COOKIE_LOGIN);
    sessionStorage.removeItem(KEY_SIGN_IN);
}

export function isUserSignedIn() {
    let signInCookie = Cookies.get(COOKIE_LOGIN);
    return  !!signInCookie;
}

export async function isSignedIn(user : IdentityUser) {
    return (await getSignedInUser()).user.userName == user.userName
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

