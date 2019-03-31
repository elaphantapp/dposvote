import Vue from 'vue';
import Vuex from 'vuex';
import util from '@/util';
import fake from '@/fake';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    node_list : null,
    current_node : null,
    node_detail : null,
    my_votes_list : null,
    my_vote_detail : null,
    me_info : null,
    my_fav_list : null,

    current_tab : 'tab1'
  },
  mutations: {
    set_node_list(state, list){
      
      state.node_list = util._.map(list, (item)=>{
        if(util._.isUndefined(item.selected)){
          item.selected = false;
        }
        return item;
      });
    },
    set_current_node(state, node){
      state.current_node = node;
    },
    set_node_detail(state, node_detail){
      state.node_detail = node_detail;
    },
    set_my_votes_list(state, list){
      state.my_votes_list = list;
    },
    set_me_info(state, info){
      state.me_info = info;
    },
    set_my_vote_detail(state, json){
      if(json.node_list){
        json.node_list = util._.map(json.node_list, (item)=>{
          if(util._.isUndefined(item.selected)){
            item.selected = false;
          }
          return item;
        });
      }
      console.log(11, json);
      state.my_vote_detail = json;
      
    },
    set_my_fav_list(state, list){
      state.my_fav_list = util._.map(list, (item)=>{
        if(util._.isUndefined(item.selected)){
          item.selected = false;
        }
        return item;
      });
    },

    set_tab(state, tab){
      state.current_tab = tab;
    }
  },
  actions: {
    set_node_list({ commit, state }, param){
      util.request(param, fake.node_list).then((list)=>{
        commit('set_node_list', list);
      })
    },
    set_node_detail({commit, state}, param){
      commit('set_node_detail', null);
      util.request(param, fake.node_detail).then((json)=>{
        commit('set_node_detail', json);
      })
    },
    set_my_votes_list({commit}, param){
      util.request(param, fake.my_votes_list).then((list)=>{
        commit('set_my_votes_list', list);
      })
    },
    set_me_info({commit}, param){
      util.request(param, fake.me_info).then((info)=>{
        commit('set_me_info', info);
      })
    },
    set_my_vote_detail({commit}, param){
      util.request(param, fake.my_vote_detail).then((json)=>{
        commit('set_my_vote_detail', json);
      })
    },
    set_my_fav_list({commit}, param){
      util.request(param, fake.node_list).then((list)=>{
        commit('set_my_fav_list', list);
      })
    }
  }
})
