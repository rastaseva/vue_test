import {BaseRequest} from "@/api/BaseRequest";

const getPostsList = BaseRequest('https://jsonplaceholder.typicode.com/posts')
export {
    getPostsList,
}
