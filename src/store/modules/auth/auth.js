import {authorize, clearAuthorize} from "@/api/auth/auth";

const lsKeys = {
    isAuthenticated: 'auth/isAuthenticated',
    username: 'auth/username'
}


const state = {
    isAuthenticated: localStorage.getItem(lsKeys.isAuthenticated) === 'true',
    username: localStorage.getItem(lsKeys.username),
    errorString: ''
}

const getters = {
    isAuthenticated: s => s.isAuthenticated,
    errorString: s => s.errorString,
    username: s => s.username
}

const actions = {
    AUTH_REQUEST: async ({ commit }, {user, pass}) => {
        if (await authorize(user, pass)) {
            commit('SUCCESS_AUTH_USER', {user})
            commit('SET_AUTH_STATE', true)
            commit('CLEAR_ERROR')
        }
        else {
            commit('ERROR_AUTH_USER', {user})
            commit('SET_AUTH_STATE', false)
            commit('CLEAR_ERROR')
        }
    },
    AUTH_LOGOUT: ({ commit }) => {
        clearAuthorize();
        commit('SET_AUTH_STATE', false);
        commit('CLEAR_USERNAME');
    },
}

const mutations = {
    SET_AUTH_STATE: (state, a)=> {
        state.isAuthenticated = a
        localStorage.setItem(lsKeys.isAuthenticated, a)
    },
    SUCCESS_AUTH_USER: (state, {user}) => {
        state.username = user ?? "Пользователь";
        localStorage.setItem(lsKeys.username, state.username)
    },
    ERROR_AUTH_USER: (state) => {
        state.errorString = 'errorString';
    },
    CLEAR_USERNAME: (state) => {
        localStorage.removeItem(lsKeys.username)
        state.username = "";
    },
    CLEAR_ERROR: state => state.errorString =  "",
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
