import { CreateBaseCachedStoreList } from "@/store/BaseCachedStoreList";
import { getPhotosList } from "@/api/user/dictionaries/photos";

function listFormatter(list, albumId) {

    console.log(list, albumId);
    const albumIds = [Number(albumId)]

    const newArr = list.filter(item => albumIds.includes(item.albumId))
    console.log(list, albumId);

    list.push(...newArr);

}


export default {
    namespaced: true,
    ...new CreateBaseCachedStoreList(getPhotosList, listFormatter)
}
