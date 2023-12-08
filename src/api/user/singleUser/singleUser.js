import {sender} from "@/api/sender";

async function getSingleUserInfo(id) {
    try {
        const { data } = await sender.send({
            endpoint: `https://jsonplaceholder.typicode.com/users/${id}`,
            method: 'get'
        })
        return data
    } catch (e) {
        return false
    }
}


export {
    getSingleUserInfo
}
