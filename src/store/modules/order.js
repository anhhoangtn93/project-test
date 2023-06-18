/* eslint-disable */
import axios from 'axios';

const state = {
    orders: null,
    pager: null,
    order: null,
};

const getters = {
    orders: state => state.orders,
    pager: state => state.pager,
    order: state => state.order,
};

const actions = {
    /**
     * get list of orders
     * @param {commit}  
     */
    async getOrders({ commit }, params) {
        let response = await axios.get(`freight/orders?s=${params.searchText}&page=${params.page}&page_size=${params.pageSize}`)
        commit('setOrders', response.data.data)
    },
    /**
     * get single order
     * @param {commit} param0 
     * @param {id} order id
     */
    async getOrder({commit}, id) {
        try {
            let resp = await axios.get(`freight/order/${id}`)
            return resp.data.data
        } catch(e) {
            console.log('get order error', e)
        }
        // commit('setOrder', resp.data.data)
    },

    /**
     * get latest order
     * @param {commit} param0 
     */
     async getLatestOrder({commit}) {
        try {
            let resp = await axios.get(`freight/order/latest`)
            return resp.data.data
        } catch(e) {
            console.log('get order error', e)
        }
        // commit('setOrder', resp.data.data)
    },

    async getStatistics({commit}) {
        try {
            let resp = await axios.get(`statistic/monthly`)
            return resp.data.data
        } catch(e) {
            console.log('get statistic error', e)
        }
    }
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
