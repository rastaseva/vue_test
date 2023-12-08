export function CreateBaseCachedStoreList(ApiRequest, listFormatter = () => { }) {
    this.state = {
        isLoading: false,
        list: [],
        updatedTime: 0,
        updateTimeDelay: 10000
    }

    this.getters = {
        list: ({ list }) => list,
        info: ({ info }) => info,
        isLoading: ({ isLoading }) => isLoading,
        updatedTime: ({ updatedTime }) => updatedTime,
        updateTimeDelay: ({ updateTimeDelay }) => updateTimeDelay
    }

    this.mutations = {
        SET_LIST: (state, list) => state.list = list,
        IS_LOADING: (state, s) => state.isLoading = !!s,
        setUpdatedTime: (state, d) => state.updatedTime = d
    }


    this.actions = {
        GET_LIST: async ({ commit, getters }, userId) => {
            const timeNow = new Date().getTime();
            if ((timeNow - getters.updatedTime) > getters.updateTimeDelay) {
                commit('IS_LOADING', true);
                const list = await ApiRequest();

                commit('IS_LOADING', false);

                if (Array.isArray(list)) {
                    listFormatter(list, userId);
                    commit('SET_LIST', list)
                    commit('setUpdatedTime', new Date().getTime())
                    return list;
                }
                else {
                    commit('setUpdatedTime', 0)
                    return null;
                }


            }
            return getters.list;

        },
    }


}



