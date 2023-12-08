import { getSingleUserInfo } from "@/api/user/singleUser/singleUser";

class BaseuserData {
    updatedTime = 0
    updateTimeDelay = 10000
    /**
     * Данные работы
     * @type {{}}
     */
    data = {}
    /**
     * Загружаются ли сейчас данные?
     * @type {boolean}
     */
    isLoading = false
    /**
     * Существует ли пользователь с данным id?
     * @type {boolean}
     */
    isExist = true
    /**
     * Id Пользователя
     * @type {null | Number}
     */
    id = null

    get loaded() {
        return this.updatedTime !== 0
    }
    set loaded(v) {
        this.updatedTime = v ? 1 : 0
    }

    /**
     * Класс для хранения и кэширования одного пользователя
     * @param id пользователя
     */
    constructor(id) {
        this.id = id;
    }
}


const state = {
    users: {}
}

const getters = {
    getUserById: ({ users }) => (id) => users[id],
}

const actions = {
    GET_USER: async ({ commit, getters }, userId) => {
        // получить пользователя из стора
        let user = getters.getUserById(userId);
        // если его не существует - создать
        if (user === undefined) {
            commit('CREATE_USER', userId);
            user = getters.getUserById(userId);
        }



        const timeNow = new Date().getTime();
        if ((timeNow - user.updatedTime) > user.updateTimeDelay) {
            user.isLoading = true;
            const data = await getSingleUserInfo(userId);
            user.isLoading = false;


            if (data && "id" in data) {
                user.isExist = true;
                user.data = data
                user.updatedTime = new Date().getTime();
            }
            else {
                user.loaded = false;
                user.isExist = false;
                return null;
            }


        }
        return user;

    },
}

const mutations = {
    CREATE_USER: (state, userId) => state.users[userId] = new BaseuserData(userId),
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
