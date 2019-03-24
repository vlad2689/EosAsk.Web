import {CheckLoginClient, UserDTO} from "./EosAskApiFetch";

let Cookies = require('js-cookie');
let sessionStorage = require('sessionstorage');

// TODO: Change this url to not have localhost
export const LOGIN_URL = "https://localhost:5001/Identity/Account/Login";
const userClient = new CheckLoginClient();

export async function getSignedInUser() : Promise<UserDTO> {
    if (!isUserSignedIn()) {
        return null;
    }
    let user = sessionStorage.getItem('signedInUser');
    if (!user) {
        user = await userClient.getLoginStatus();
        sessionStorage.setItem('signedInUser', JSON.stringify(user));
        return user;
    }
    
    return (JSON.parse(user).user);
}

export function isUserSignedIn() {
    let signInCookie = Cookies.get(".AspNetCore.Identity.Application");
    return  !!signInCookie;
    
    // return (<any> window).userSignedIn || false;
}

export function getSignedInUserId() {
    return "\"da1378c5-1c08-4189-aa1f-991be9f7702d\"";
    
    // return (<any> window).userId || false;
}

export function getPostSignInRedirectUrlAndRemove() {
    let redirectUrl = getPostSignInRedirectUrl();
    if (redirectUrl) {
        Cookies.remove('loginRedirect');
    }
    
    return redirectUrl;
}

export function getPostSignInRedirectUrl() {
    return Cookies.get('loginRedirect') || null;
}

export function setPostSignInRedirectUrl() {
    let currUrl = window.location.href;
    Cookies.set('loginRedirect', currUrl, {expires: 1});
}

