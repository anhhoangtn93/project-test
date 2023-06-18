/* eslint-disable */

const state = {
    avatars: {}
};

const getters = {
    avatars: state => state.avatars,
};

const actions = {
    async fetchAvatars ({ commit, state }) {
        if (Object.keys(state.avatars).length) {
            return state.avatars
        }

        let avatars = {}
        let files = require.context('@/assets/avatar/', true, /\.png$/i)
        files.keys().map((key) => {
            let id = key.split('/').pop().split('.')[0].substring(7).toUpperCase()
            // them
            var xhr = new XMLHttpRequest();       
            xhr.open("GET", require('@/assets/avatar/' + key.split('/').pop()), true); 
            xhr.responseType = "blob";
            xhr.onload = function (e) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    var res = event.target.result;
                    avatars[id] = {
                        path: res,
                        id: id
                    }
                }
                var file = this.response;
                reader.readAsDataURL(file)
            };
            xhr.send()
            // them
            
            // avatars[id] = {
            //     path: key.split('/').pop(),
            //     id: id
            // }
        })

        commit('setAvatars', avatars)
    }
};

const mutations = {
    setAvatars (state, avatars) {
        state.avatars = avatars
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};