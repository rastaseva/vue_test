
import { CreateBaseCachedStoreList } from "@/store/BaseCachedStoreList";
import { getPostsList } from "@/api/user/dictionaries/posts";


function filterList(list, filterId) {
    const postIds = [Number(filterId)]
    
    const newArr = list.filter(item => postIds.includes(item.userId))

    list.splice(0, list.length);
    list.push(...newArr);
    console.log(list);
}


export default {
    namespaced: true,
    ...new CreateBaseCachedStoreList(getPostsList, filterList)
}
