let Cookies = require('js-cookie');

// TODO: Change this url to not have localhost
export const LOGIN_URL = "https://localhost:5001/Identity/Account/Login";

export function isUserSignedIn() {
    return (<any> window).userSignedIn || false;
}

export function getSignedInUserId() {
    return (<any> window).userId || false;
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

