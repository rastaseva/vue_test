import albums from "@/store/modules/dictionaries/albums";
import photos from "@/store/modules/dictionaries/photos"
import posts from "@/store/modules/dictionaries/posts";

export const dictionaries = {
    namespaced: true,
    modules: {
        albums,
        photos,
        posts
    }
}
