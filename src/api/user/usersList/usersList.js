import {BaseRequest} from "@/api/BaseRequest";

const getUsersList = BaseRequest('https://jsonplaceholder.typicode.com/users/')
export {
    getUsersList,
}
