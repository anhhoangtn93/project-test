/* eslint-disable */
import axios from 'axios';

const state = {
    
};

const getters = {
    
};

const actions = {
    /**
     * get messages
     * @param {commit}  
     */
    async getMessages({ commit }, channel) {
        let resp = await axios.get(`notif/messages?channel=${channel}`)
        return resp.data.data
    },
    async getMessage({ commit }, id) {
        let resp = await axios.get(`notif/message?id=${id}`)
        return resp.data.data
    },
};
const mutations = {
    setOrders(state, orders){
        state.orders = orders
        state.pager = {
            page: orders.pager.page + 1,
            length:  Math.ceil(orders.pager.total / orders.pager.per_page)
        }
    },
    setOrder(state, order) {
        state.order = order
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
