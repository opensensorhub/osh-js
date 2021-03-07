import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        all: {},
        filteredAll: {
            start:0,
            end: 0,
            idx: [] //deck layer index
        },
        count: 0
    },
    actions: {
        setTimeRange({state, commit}, props) {
            const {startTime, endTime} = {...props};
            // filtered idx based on start/end time
            const filteredAll = [];
            for (let layerIdx in state.all) {
                const layerData = state.all[layerIdx];
                if (layerData.min >= startTime && layerData.max <= endTime) {
                    filteredAll.push(layerIdx);
                }
            }
            commit('setFilteredAll', {
                start: startTime,
                end: endTime,
                idx: filteredAll
            });
        },

        addData({state, commit}, data) {
            if (data.values.length > 0) {
                // compute min/max by layer
                let tMin = Number.MAX_SAFE_INTEGER, tMax = 0;
                let t;
                for (let i = 0; i < data.values.length; i++) {
                    t = Date.parse(data.values[i].data.time);
                    if (t < tMin) {
                        tMin = t;
                    }
                    if (t > tMax) {
                        tMax = t;
                    }
                }
                commit('count');
                commit('addData', {
                    idx: data.layer.id,
                    min: tMin,
                    max: tMax,
                    values:data.values.map(v => v.data.time)
                });
            }
        },

        setData({state, commit}, data) {
            if (data.length > 0) {
                commit('setData', data);
            }
        }
    },
    mutations: {
        setData(state, data) {
            state.all = data;
        },
        addData(state, data) {
            const newObject = { ...state.all};
            newObject[data.idx] = {
                min: data.min,
                max: data.max,
                values:data.values
            };

            state.all = { ...newObject}
        },
        setFilteredAll(state, filteredAll) {
            state.filteredAll = {...filteredAll};
        },
        count(state) {
            state.count += 1;
        }
    }
});
