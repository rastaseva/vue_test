import axios from 'axios';
import {useToast} from "vue-toastification";

class Sender {
    localStorageKey = "sender-axios";
    authorization;
    baseUrl;
    notification = null;

    constructor(baseUrl, config) {
        this.baseUrl = baseUrl;
        const lsItem = localStorage.getItem(this.localStorageKey)
        if (lsItem) this.authorization = lsItem;
        if (config?.auth) this.setAuth(config.auth);


        try {
            this.notification = useToast();
        } catch {
            console.log('-----NOTIFICATION SERVER ERROR-----')
        }
    }


    setAuth({username, password}) {
        this.authorization = `Basic ${btoa(`${username}:${password}`)}`;
        localStorage.setItem(this.localStorageKey, this.authorization);
    }

    clearAuth() {
        this.authorization = "";
        localStorage.removeItem(this.localStorageKey);
    }

    notifyError(errorText = "") {
        this.notification?.error(errorText, {
            timeout: 4000
        });
    }

    error(err, text = null) {
        delete err.stack;
        console.warn(`-----REQUEST REJECTED-----\n ${err?.config?.url?.split('/').at(-1)}`, err)

        let errText;
        switch (err.code) {
            case 'ERR_NETWORK':
                errText = 'Сервер недоступен!';
                break;
            case 'ERR_BAD_REQUEST':
                switch (err.response.status) {
                    case 401:
                        errText = 'Ошибка авторизации!'
                        break;
                    default:
                        errText = `${err.response.status} Ошибка запроса!`
                }
                break;
            default:
                errText = 'Неизвестная ошибка!';
        }

        this.notifyError(`${text ?? errText}`)
    }

    send({endpoint, method, params, data}) {
        return new Promise((resolve, reject) => {

            let config = {
                headers: {},
                params: params
            };

            if (this.authorization) config.headers["Authorization"] = this.authorization;

            let url = `${this.baseUrl}${endpoint}`;

            let axiosParams, axiosMethod;

            switch (method.toLowerCase()) {
                case 'get':
                    axiosParams = [url, config]
                    axiosMethod = 'get';
                    break;
                case  'post':
                    axiosParams = [url, data, config]
                    axiosMethod = 'post';
                    break;
                default:
                    reject(`undefined method ${method}`);
                    return;

            }


            try {

                axios[axiosMethod](...axiosParams).then((res) => {

                    console.log("-----REQUEST RECEIVED-----", res)

                        resolve(res)



                }).catch((err) => {
                    this.error(err)
                    reject(err)
                })

            } catch (e) {
                this.notifyError("Внутренняя ошибка")
                console.warn("-----REQUEST ERROR-----", e)
                reject(e);
            }


        });


    }

}


export const sender = new Sender(process?.env?.NODE_ENV === 'development' ? '' : '');
