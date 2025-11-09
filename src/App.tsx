import React, { useEffect } from "react";
import Redirect from "./routing/router.tsx";
import StorageService from "./common/utils/storageService.ts";
import Constants from "./common/constant/Constant.ts";
import { createClient } from "@supabase/supabase-js";
import Cookies from "js-cookie";


function App() {
    const accTk = StorageService.getTokenByName(`${Constants.TOKEN_NAME}`);
    const accTkTime = StorageService.getTokenByName(`${Constants.TOKEN_NAME}-expires`);
    // const convertDate: Date | null = accTkTime ? new Date(accTkTime) : null;


    useEffect(() => {
        if (!accTk) Cookies.remove(`${Constants.TOKEN_NAME}-expires`) 
        const authCheck = async () => {
            try {
                const localSessionStr = localStorage.getItem("sb-nzztfzrjheuyfaaltrst-auth-token");
                const getLocalSession = localSessionStr ? JSON.parse(localSessionStr) : "";    
                const accessToken = StorageService.getTokenByName(`${Constants.TOKEN_NAME}`);
                const convertDate: Date | null = accTkTime ? new Date(accTkTime) : null;
                const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON);
                const now = Math.floor(Date.now() / 1000);
                const remaining: number = convertDate ? Math.floor(convertDate.getTime() / 1000) - now : Infinity;

                const {data: {session}, error} = await supabase.auth.getSession();
                console.log("check session --- ", session);
                if (error) throw error;

                // !session?.access_token
                // 300
                if (remaining < 15 || !accessToken) {
                    const {data, error: refreshError} = await supabase.auth.refreshSession();
                    if (refreshError) throw refreshError;

                    const newSession = data.session;

                    if (!newSession) {
                        console.warn("No new session return from refreshSession()");
                        return;
                    }
                    if (newSession?.access_token && newSession.expires_at) {
                        Cookies.set(`${Constants.TOKEN_NAME}`, newSession.access_token, {
                            expires: new Date(newSession.expires_at * 1000),
                            secure: true,
                            sameSite: "Strict",
                        });
                    }
                    if (newSession?.refresh_token) {
                        Cookies.set(`${Constants.REFRESH_TOKEN}`, newSession.refresh_token, { expires: 30 });
                    }

                    console.log("Add new Token")    
                    return newSession;
                } else {console.log("Token is still valid, no need to refresh")}

            } catch (error:any) {
                console.error("Error refresh session", error);
            }   
        };
        authCheck();
    },[accTk]) 

    return (
        <>
            <Redirect />
        </>
    );
}

export default App;
