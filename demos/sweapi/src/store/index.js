import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const originalState = {
    right: {
        content: undefined,
        header: {
            selected: undefined,
            prettyJson: true,
            height: 0
        }
    },
    maxHeight: 800,
    server: {
        url : 'ogct17.georobotix.io:8443/sensorhub/api',
        mqtt: {
            url: 'ogct17.georobotix.io:8483',
            prefix: '/api'
        },
        tls: true
    }
};
export default new Vuex.Store({
    state: {
        ...originalState
    },
    actions: {
        updateRightContent({state, commit}, value) {
            commit('setRightContent', value);
        },
        updateMaxHeight({state, commit}, value) {
            commit('setMaxHeight', value);
        },
        updateHeader({state, commit}, props) {
            commit('setHeader', props);
        },
        reset({state, commit}) {
            commit('reset');
        },
        updateServer({state, commit}, props) {
            commit('setServer', props);
        }
    },
    mutations: {
        setRightContent(state, value) {
            state.right.content = value
        },
        setMaxHeight(state, value) {
            state.maxHeight = value
        },
        setHeader(state, props) {
            state.right.header = {
                ...state.right.header,
                ...props
            }
        },
        setServer(state, props) {
            state.server = {
                ...state.server,
                ...props
            }
        },
        reset(state) {
            state = {
                ...originalState
            }
        }
    }
});
