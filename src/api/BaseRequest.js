
import {sender} from "@/api/sender";
export const BaseRequest = (endpoint, params = {})=>{
    return async ()=>{
        {
            try {
                const { data } = await sender.send({
                    endpoint,
                    method: 'get',
                    params
                })
                return data
            } catch (e) {
                return false
            }
        }
    }
}

