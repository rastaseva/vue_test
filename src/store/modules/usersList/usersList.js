import { getUsersList } from "@/api/user/usersList/usersList";
import { CreateBaseCachedStoreList } from "@/store/BaseCachedStoreList";

function listFormatter(list) {
    return list.filter(e => {
        e.address = e.address === '(null)' ? '—' : e.address
        e.hasAttachment = e.hasAttachment ? 'Есть' : ''
        e.hasEquipment = e.hasEquipment ? 'Есть' : ''
        e.icons = {
            type: 'icons',
            icons: [],
        }
        if (e.createdByBrigade) e.icons.icons.push('mdi-account-hard-hat');
        if (e.hasEquipment) e.icons.icons.push('mdi-truck');
        if (e.status === 'Новая' && e.brigade !== null) e.icons.icons.push('mdi mdi-exclamation')
        // e.status = e.status === 'Просрочена' ? 'mdi mdi-exclamation' : e.status

    })
}




export default {
    namespaced: true,
    ...new CreateBaseCachedStoreList(getUsersList, listFormatter)
}
