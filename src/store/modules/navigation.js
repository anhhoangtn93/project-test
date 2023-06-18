/* eslint-disable */
import axios from 'axios';
import router from "@/router"

const state = {
    page: null,
};

const getters = {
    currentPage: function(state)  { 
        console.log('getpage', state.page)
        return state.page
    },
};

const actions = {
    setPage({ commit }, page) {
        console.log('setpage', page)
        // navigate to new page
        try {
            router.push({name: page})
        } catch(e) {
            console.log('navigation error', e)
        }
        commit('setPage', page)
    },
};
const mutations = {
    setPage(state, page){
        state.page = page
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
