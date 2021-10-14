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
            footprint: false,
            draping: false,
            fov: false,
            selected : false
        },
        target : {
            position: {
                connected: false
            }
        }
    },
    actions: {
        toggleDroneSelection({state, commit}, props) {
            commit('toggleDroneSelection', !state.drone.selected);
        },
        toggleDroneFootprint({state, commit}, props) {
            commit('toggleDroneFootprint', !state.drone.footprint);
        },
        toggleDroneFov({state, commit}, props) {
            commit('toggleDroneFov', !state.drone.fov);
        },
        toggleDroneDraping({state, commit}, props) {
            commit('toggleDroneDraping', !state.drone.draping);
        },
        updateDroneDataSourceStatus({state, commit}, props) {
            commit('setDroneConnections', {...props});
        },
        updateTargetDataSourceStatus({state, commit}, props) {
            commit('setTargetConnections', {...props});
        },
    },
    mutations: {
        showFootprint(state, value) {
            state.footprint = value;
        },
        toggleDroneSelection(state, value) {
            state.drone.selected = value;
        },
        toggleDroneFootprint(state, value) {
            state.drone.footprint = value;
        },
        toggleDroneFov(state, value) {
            state.drone.fov = value;
        },
        toggleDroneDraping(state, value) {
            state.drone.draping = value;
        },
        setDroneConnections(state, value) {
            state.drone = {
                ...state.drone,
                ...value
            }
        },
        setTargetConnections(state, value) {
            state.target = {
                ...state.target,
                ...value
            }
        }
    }
});
