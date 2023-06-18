/* eslint-disable */
import router from "@/router"
import { i18n } from '@/i18n'

const state = {
    isShowModal: false,
};

const actions = {
    setShowModal({ commit }) {
        commit('setShowModal'); // Gọi mutation 'setShowModal'
    }

};

const mutations = {
    setShowModal(state) {
        state.isShowModal = !state.isShowModal;
        console.log('isShowModal: ' + state.isShowModal);
    }
};
export default {
    namespaced: true,
    state,
    actions,
    mutations
};