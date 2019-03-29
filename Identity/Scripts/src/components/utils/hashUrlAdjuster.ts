const IS_APP_USING_HASH_ROUTER = true; // Should change this if App.tsx changes from HashRouter to HistoryRouter

export function prependHash(url: string) {
    if (IS_APP_USING_HASH_ROUTER) {
        return `/#${url}`;
    }
    
    return url;
}