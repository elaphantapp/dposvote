import Vue from 'vue';
import Vuex from 'vuex';
import util from '@/util';
import fake from '@/fake';

import request from './request';

Vue.use(Vuex);

const F = {
  processNodeList(list){
    const fav_list = F.getFavList();
    return util._.map(list, (item)=>{
      if(util._.isUndefined(item.selected)){
        item.selected = false;
      }
      item.Location = item.Location.toString();
      item.id = item.Address;
      item.Percentage = Math.fround((item.Votes/item.Value)*100).toFixed(2);

      const flag = util._.findIndex(fav_list, (l)=>{
        return l.id === item.id;
      });
      item.fav = flag !== -1;

      return item;
    });
  },
  getFavList(){
    const list = util.ls.get('fav_list');
    if(!list) return [];

    return list;
  },
  setFavList(list){
    util.ls.set('fav_list', list);
  }
};

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
      
      state.node_list = F.processNodeList(list);
      console.log(11, state.node_list)
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
      state.my_fav_list = list;
    },

    set_tab(state, tab){
      state.current_tab = tab;
    }
  },
  actions: {
    set_node_list({ commit, state }, param){
      const cache_list = util.rc.get('node_list');
      if(cache_list){
        commit('set_node_list', cache_list);
        return false;
      }

      request.getCurrentBlockHeight().then((d)=>{
        const height = d.result;
        request.getNodeList(height).then((d)=>{
          util.rc.set('node_list', util._.clone(d.result));
          console.log(1, d)
          const list = d.result;
          commit('set_node_list', list);
        })
      })

    },


    set_node_detail({commit, state}, id){
      commit('set_node_detail', null);
      const json = util._.find(state.node_list, (item)=>{
        return item.id === id;
      });
      commit('set_node_detail', json);

      // request.getNodeInfoByAddress(id).then((d)=>{
      //   console.log(2, d);
      // })
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
      const list = F.getFavList();
      commit('set_my_fav_list', list);
    },

    addFavItem(store, item){
      let list = F.getFavList();
      list.unshift(item);

      store.dispatch('set_node_list', {});

      F.setFavList(list);
      
    },
    removeFavItem(store, param){
      const list = F.getFavList();
      util._.remove(list, (item)=>{
        return item.id === param.id;
      });
      store.dispatch('set_node_list', {});
      F.setFavList(list);
    }
  }
})
