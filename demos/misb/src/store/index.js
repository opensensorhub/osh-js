import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        all: {},
        drone: {
            video: {
                connected: false
            },
            position: {
                connected: false
            },
            selected: false,
        }
    },
    actions: {
        toggleDroneSelection({state, commit}, props) {
            commit('toggleDroneSelection', !state.drone.selected);
        },
        showFootprint({state, commit}, props) {

        },
        updateDroneDataSourceStatus({state, commit}, props) {
            commit('setDroneConnections', {...props});
        },
    },
    mutations: {
        showFootprint(state, value) {
            state.footprint = value;
        },
        toggleDroneSelection(state, value) {
            state.drone.selected = value;
        },
        setDroneConnections(state, value) {
            state.drone = {
                ...state.drone,
                ...value
            }
        }
    }
});
