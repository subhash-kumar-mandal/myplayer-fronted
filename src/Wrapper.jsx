import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppRouters from "./routers/AppRouters";
import { setUserObject } from "../src/utils/userSlice";
import DotLoader from "./components/UX/DotLoader";
import { URL_OBJECT } from "./services/fetchHandleAll";
// import LoadingScreen from "../components/LoadingScreen";

function AuthWrapper() {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {

        async function checkAuth() {

            try {

                const res = await fetch(URL_OBJECT.BASE_URL+"/user/refresh", {
                    method: "GET",
                    credentials: 'include',

                })
                const result = await res.json();

                if (!res.ok || !result.success) throw new Error(result.message || "Failed to refresh token");

                dispatch(setUserObject({ user: result.user, accessToken: result.accessToken }))


            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }

        }

        checkAuth();

    }, []);

    if (loading) {
        return (
            <div
                className="h-screen w-screen flex justify-center items-center"
            >
                <DotLoader />
            </div>
        )
    }

    return <AppRouters />;
}

export default AuthWrapper;