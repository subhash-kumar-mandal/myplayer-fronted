
import { isClearUser, setAccessToken } from "../utils/userSlice";
import RootStore from '../utils/Store'
import { isPlayerClear } from "@/utils/playerSlice";

export const URL_OBJECT = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    REFRESH_URL: import.meta.env.VITE_REFRESH_TOKEN,
    TRACK_URL: import.meta.env.VITE_TRACK_URL,
    HOME_TRACK_CLICK: import.meta.env.VITE_HOME_TRACK_CLICK
}

const accessTokenFetch = async () => {
    try {

        const res = await fetch(URL_OBJECT.BASE_URL + "/" + URL_OBJECT.REFRESH_URL, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        });
        const result = await res.json();

        if (!res.ok || !result.success) throw new Error("Something is worng");

        const token = result.accessToken;


        RootStore.dispatch(setAccessToken(token));
        return token

    } catch (err) {


        console.error(err.message)
        RootStore.dispatch(isPlayerClear())
        RootStore.dispatch(isClearUser());
        return null
    }
};



export async function apifetch(url, option) {


    let res = await fetch(url, option);

    if (res.status === 401) {

        const token = await accessTokenFetch();

        if (!token) {
            return null
        };

        option.headers.Authorization = `Bearer ${token}`;

        res = await fetch(url, option);

    }

    return await res.json()


};



export async function fetchPOST(url, option = {}, body = {}) {

    try {
        let res = await fetch(url, { ...option, body: body });

        if (res.status === 401) {
            const token = await accessTokenFetch();

            if (token) {
                return null
            };

            option.headers.Authorization = `Bearer ${token}`

            res = await fetch(url, { ...option, body: body })
        };

        return await res.json();


    } catch (err) {
        return {
            message: err.message,
            success: false
        }
    }

}