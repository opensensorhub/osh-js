import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const originalState = {
    right: {
        content: undefined,
        contentType: undefined,
        header: {
            selected: undefined,
            prettyJson: false,
            height: 0
        }
    },
    maxHeight: 800,
    server: {
        url : 'api.georobotix.io/ogc/t18/api',
        mqtt: {
            url: 'api.georobotix.io:443/ogc/t18',
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
        updateRightContent({state, commit}, props) {
            commit('setRightContent', props);
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
        setRightContent(state, props) {
            state.right.content = props.content;
            state.right.contentType = props.contentType;
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
            state = originalState;
        }
    }
});
