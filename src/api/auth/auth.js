import {sender} from "@/api/sender";

async function isAuthorized() {

    try {
        const {data} = await sender.send({endpoint: '/ping', method: 'get'});

        if ("isAuthorized" in data) {
            return !!data.isAuthorized;
        }
        else return false;
    }
    catch (e) {
        return false;
    }






}


async function authorize(username,password) {
    sender.setAuth({
        username,
        password
    })
    return await isAuthorized();
}

function clearAuthorize() {
    sender.clearAuth();
}

export {
    isAuthorized,
    authorize,
    clearAuthorize
}