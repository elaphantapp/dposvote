<template>
  <div class="p-myFav kg-page">
    <!-- <mt-header :title="$t('FAVORITES')">
    </mt-header> -->

    <div class="kg-body kg-tab">
      <div class="c-list">
        <VotingListItem 
          v-for="(item, i) in list" v-bind:key="i" 
          v-bind:status="vote_status"
          v-bind:clickFn="clickItem"
          v-bind:item="item" 
          v-bind:favFn="favItem"
          v-bind:index="i+1">
        
        </VotingListItem>
      </div>
    </div>

  </div>
</template>
<script>
import util from '@/util';
import VotingListItem from '../components/VotingListItem';
export default {
  data(){
    return {
      vote_status : 'list',
    };
  },
  components: {
    VotingListItem
  },
  computed: {
    list(){
      if(this.$store.state.my_fav_list){
        // util.loading(false);
        const list = util._.map(this.$store.state.my_fav_list, (item)=>{
          item.fav = true;
          return item;
        });
        return list;
      }

      // util.loading(true);
      return [];
    }
  },
  created(){
    util.register('set_tab', (key, tab)=>{
      if(tab === 'tab2'){
        this.$store.dispatch('set_my_fav_list', {});
      }
    })
  },

  methods: {
    clickItem(item){
      this.$router.push('/node_detail/'+item.id);
    },
    favItem(item){
      this.$store.dispatch('removeFavItem', item);
      this.$store.dispatch('set_my_fav_list', {});
    }
  }
}
</script>
<style lang="scss">
.p-myFav{

}
</style>

