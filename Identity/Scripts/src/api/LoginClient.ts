// TODO: Change this url to not have localhost
export const LOGIN_URL = "https://localhost:5001/Identity/Account/Login";

export async function checkLogin() {
    // store current url in session js object
    // make call to checkloginclient, if the user is logged in
    // let them proceed as normal and store the username in a cookie; 
    // if the user is not logged in redirect them to the login page
    
    // on layout, if there is a url in the session object, redirect to that url
}

export function isUserSignedIn() {
    return (<any> window).userSignedIn || false;
}
