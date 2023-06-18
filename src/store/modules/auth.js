/* eslint-disable */
import axios from 'axios';
import router from "@/router"
import { i18n } from '@/i18n'

const state = {
    user: null,
    accessToken: null,
};

const getters = {
    isAuthenticated: state => !!state.user,
    accessToken: state => state.accessToken,
    currentUser: state => state.user,
};

const actions = {
    async register({ dispatch }, form) {
        await axios.post('register', form)
        
        let formData = new FormData()
        formData.append('username', form.username)
        formData.append('password', form.password)
        await dispatch('login', formData)
    },

    async login({ commit }, user) {
        try {
            let { data } = await axios.post('login', user)
            await commit('setUser', data['data']['user'] )
            await commit('setToken', data['data']['token'])
            return {success: true}
        } catch(error) {
            if(error.response && (error.response.status == 403 || error.response.status == 401)) {
                return {errors: i18n.global.t("login.error_403")}
            }
            return {errors: error}
        }
    },

    async createPost({ dispatch }, post) {
        await axios.post('post', post)
        await dispatch('getPosts')
    },

    async getPosts({ commit }) {
        let response = await axios.get('me')
        // ccommit on mutations
        commit('setPosts', response.data)
    },

    async logout({ commit }) {
        // clear data
        let user = null
        await commit('logout', user)
        // redirect to login page
        try {
            router.push({name: 'login'})
        } catch(e) {
            console.log('navigation error', e)
        }
    },
    async resetPassword({commit}, login) {
        try {
            let form = new FormData()
            form.append('login', login)
            let { data } = await axios.post('reset_password', form)
            return {success: true}
        } catch(error) {
            console.log(error)
            if(error.response && error.response.status == 404) {
                return {errors: "Invalid username or email"}
            }
            return {errors: error}
        }
    },
    async confirmResetPassword({commit}, form) {
        try {
            let { data } = await axios.post('confirm_reset_password', form)
            await commit('setUser', data['data']['user'] )
            await commit('setToken', data['data']['token'])
            return {success: true}
        } catch(error) {
            console.log(error)
            if(error.response && error.response.status == 404) {
                return {errors: $t("message.token_invalid_or_expired")}
            } else if(error.response.status==400) {
                return {errors: $t("message." + error.response.message)}
            }
            return {errors: error}
        }
    },
    async syncProfile({commit}, form){
        try {
            let { data } = await axios.post('sync_profile', form)
            await commit('setUser', data['data'])
            return {success: true}
        } catch (error) {
            console.log(error)
            if(error.response && error.response.status == 404) {
                return {errors: $t("message.not_found")}
            } else if(error.response.status==400) {
                return {errors: $t("message." + error.response.message)}
            }
            return {errors: error}
        }
    }
};

const mutations = {
    setUser(state, user){
        state.user = user
    },
    setToken(state, token) {
        state.accessToken = token
    },
    setPosts(state, posts){
        state.posts = posts
    },
    logout(state){
        state.user = null
        state.accessToken = null
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};