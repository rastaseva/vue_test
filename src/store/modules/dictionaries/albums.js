
import { CreateBaseCachedStoreList } from "@/store/BaseCachedStoreList";
import { getAlbumsList } from "@/api/user/dictionaries/albums";

function listFormatter(list, userId) {
    const postIds = [Number(userId)]

    const newArr = list.filter(item => postIds.includes(item.userId))

    list.splice(0, list.length);
    list.push(...newArr);

}


export default {
    namespaced: true,
    ...new CreateBaseCachedStoreList(getAlbumsList, listFormatter)
}
