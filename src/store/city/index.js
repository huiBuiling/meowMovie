import storage from '@/tools/localStorage';
let oldCity = storage.get('curCity');
oldCity = JSON.parse(oldCity);

const state = {
    nm: oldCity && oldCity.nm || '广州',
    id: oldCity && oldCity.id || 20,
};

const actions = {};

const mutations = {
    CITY_INFO(state, payload) {
        state.nm = payload.nm;
        state.id =  payload.id;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
