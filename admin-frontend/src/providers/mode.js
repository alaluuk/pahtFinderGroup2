import Cookies from "js-cookie";

export const getAppMode = () => {
    const modeCookie = Cookies.get('__session_mode');
    return (modeCookie) ? modeCookie : 'production';
}
export const setAppMode = (mode) => {
    Cookies.set('__session_mode', mode);
    window.location.reload();
}