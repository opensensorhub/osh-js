import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        all: {},
        commands: new Map()
    },
    actions: {
        setCommand({state, commit}, props) {
            commit('setCommand', {...props});
        },
        removeCommand({state, commit}, id) {
            commit('removeCommand', id);
        },
    },
    mutations: {
        setCommand(state, value) {
            state.commands.set(value.id,{
                ...value
            });
        },
        removeCommand(state, id) {
            state.commands.delete(id);
        },
    }
});
