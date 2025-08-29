import Constants from "../constant/Constant";
import { eraseCookie, getCookie, setCookie } from "./Utils";

export default class StorageService {
    public setIdTenant(domain: string) {
        localStorage.setItem("domainName", `${domain}`);
    }
    public setDataLocal(idDomain: string) {
        localStorage.setItem("idDomain", `${idDomain}`);
    }
    public setNameUser(name: string) {
        localStorage.setItem("nameDomain", `${name}`);
    }
    public setAvatarUser(name: string) {
        localStorage.setItem("avatarUSer", `${name}`);
    }
    //Chỉ lưu nhưng kiểu đơn giản như số hoặc string
    public static setLocalStore(key: any, value: any) {
        localStorage.setItem(key, value);
    }
    public static getLocalStore(key: any) {
        return localStorage.getItem(key);
    }
    //End chỉ lưu nhưng kiểu đơn giản như số hoặc string

    //Chỉ lưu nhưng kiểu mảng
    public static saveArayLS = (key: string, arr: any) => {
        localStorage.setItem(key, JSON.stringify(arr));
    };

    public static getArrayFromLS = (key: string): Array<any> => {
        let data = [];
        if (localStorage.getItem(key)) {
            try {
                const arrayLocal = localStorage.getItem(key);
                data = JSON.parse(arrayLocal ? arrayLocal : "");
            } catch (e) {
                data = [];
            }
        }
        return data;
    };
    //End chỉ lưu nhưng kiểu đơn giản như số hoặc string

    //Chỉ lưu nhưng kiểu object
    public static setObjectStore(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public static getObjectStore(key: string): any {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    //End lưu nhưng kiểu object

    /**
     *
     * @param key
     * @description Xóa LocalStore
     */
    public static removeLocalStore = (key: string) => {
        localStorage.removeItem(key);
    };

    public static setToken(token: string) {
        setCookie(Constants.TOKEN_NAME, token, {days : Constants.TOKEN_EXPIRE_DAYS});
    }
    // public static setTokenS(token:string) {
    //     setCookie(Constants.TOKEN_NAME, token, {seconds : 7});
    // }
    public static getToken(){
        return getCookie(Constants.TOKEN_NAME);
    }
    public static removeToken() {
        eraseCookie(Constants.TOKEN_NAME);
    }
    public static isTokenExits() {
        return StorageService.getToken() !== null;
    }

}
