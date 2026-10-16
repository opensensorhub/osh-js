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
            platformLocation: {
                connected: false
            },
            platformOrientation: {
                connected: false
            },
            cameraOrientation: {
                connected: false
            },
            hFov: {
                connected: false
            },
            vFov: {
                connected: false
            },
        },
        geoRefImage: {
            connected : false
        },
        target : {
            location: {
                connected: false
            }
        },
        ui: {
            draping: false,
            fov: false,
            footprint: false,
            droneSelected: false,
            droneVideo: false,
            targetSelected: false,
            videoView: undefined
        }
    },
    actions: {
        updateDroneStatus({state, commit}, props) {
            commit('setDroneStatus', {...props});
        },
        updateTargetStatus({state, commit}, props) {
            commit('setTargetStatus', {...props});
        },
        updateGeoRefStatus({state, commit}, props) {
            commit('setGeoRefStatus', {...props});
        },
        updateUiStatus({state, commit}, props) {
            commit('setUiStatus', {...props});
        },
        toggleUiDroneSelection({state, commit}, props) {
            commit('setUiDroneSelection', !state.ui.droneSelected);
        },
        toggleUiFootprint({state, commit}, props) {
            if (state.geoRefImage.connected) {
                commit('setUiFootprint', !state.ui.footprint);
            }
        },
        toggleUiDraping({state, commit}, props) {
            if (state.drone.video.connected) {
                commit('setUiDraping', !state.ui.draping);
            }
        },
        toggleUiFov({state, commit}, props) {
            if (state.drone.vFov.connected) {
                commit('setUiFov', !state.ui.fov);
            }
        },
        toggleUiDroneVideo({state, commit}, props) {
            if (state.drone.video.connected) {
                commit('setUiDroneVideo', !state.ui.droneVideo);
            }
        },
        updateUiVideoView({state, commit}, props) {
            commit('setUiVideoView', props)
        }
    },
    mutations: {
        setDroneStatus(state, value) {
            state.drone = {
                ...state.drone,
                ...value
            }
        },
        setTargetStatus(state, value) {
            state.target = {
                ...state.target,
                ...value
            }
        },
        setGeoRefStatus(state, value) {
            state.geoRefImage = {
                ...state.geoRefImage,
                ...value
            }
        },
        setUiStatus(state, value) {
            state.ui = {
                ...state.ui,
                ...value
            }
        },
        setUiDroneSelection(state, value) {
            state.ui.droneSelected = value;
        },
        setUiFootprint(state, value) {
            state.ui.footprint = value;
        },
        setUiDraping(state, value) {
            state.ui.draping = value;
        },
        setUiFov(state, value) {
            state.ui.fov = value;
        },
        setUiDroneVideo(state, value) {
            state.ui.droneVideo = value;
        },
        setUiVideoView(state, value) {
            state.ui.videoView = value;
        },
    }
});
