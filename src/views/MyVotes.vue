<template>
  <div class="kg-page p-myVotes">
    <!-- <mt-header :title="$t('MY_VOTES')">
      
    </mt-header> -->

    <div class="kg-body kg-tab">
      <div v-if="info" class="kg-gap" style="background:#f9f9f9; padding: 12px 15px;">
        <div class="c-rule">
          <p class="t1">{{$t('VOTING_POWER_USED')}}/{{$t('TOTAL')}} (ELA)</p>
          <p class="t2">{{info.vp_used | toF2}}/{{info.ela_total | toF2}}</p>
        <!--     <button class="t4" @click="revoke()">
            {{$t('09')}}
          </button> -->
          <button class="t3" @click="showPopUp()">
            <i class="fa fa-question-circle-o"></i>
            {{$t('RULE')}}
          </button>
        </div>
      </div>
      
      
      <!-- <mt-navbar style="margin-top:12px;" v-model="selected">
        <mt-tab-item id="success">{{$t('SUCCESS')}}</mt-tab-item>
        <mt-tab-item id="failure">{{$t('FAILURE')}}</mt-tab-item>
      </mt-navbar> -->
      <mt-tab-container v-model="selected" class="c-list" :class="{ 'c-list1': isIos }">
        <mt-tab-container-item id="success" >
          <MyVoteBaseList v-for="(item, i) in list" v-bind:key="i" v-bind:data="item" />
        </mt-tab-container-item>
        <mt-tab-container-item id="failure">
          
        </mt-tab-container-item>
      </mt-tab-container>


<!-- <div style="word-break:break-all;padding:10px 15px;">{{test}}</div> -->
    </div>

    

    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <div class="c-popup">
        <div class="c-header">{{$t('VOTING_RULE')}}</div>
        <div class="c-body">
          <ul>
            <li>{{$t('rule_msg.1')}}
            </li>
            <li>{{$t('rule_msg.2')}}</li>
          </ul>
          <p class="p1"><b>{{$t('MORE_DETAIL')}}</b></p>
          <p class="p2"><a :href="$t('rule_msg.link')">{{$t('rule_msg.link')}}</a></p>
          

          <p class="p3">
            <mt-button @click="popupVisible=false" size="large" type="primary">OK</mt-button>
          </p>
          
        </div>
      </div>
    </mt-popup>

  </div>
</template>
<script>
import util from '@/util';
import MyVoteBaseList from '../components/MyVoteBaseList';

export default {
  components : {
    MyVoteBaseList
  },
  data(){
    return {
      isIos:false,  
      popupVisible : false,
      selected: 'success',
      test : ''
    }
  },
  methods: {
    showPopUp(){
      this.popupVisible = true;
    },
    revoke(){
        let url = util.buildRevokeVoteSchema();
        location.href = url;
    }
  },
  computed: {
    info(){
      if(this.$store.state.me_info){
        // util.loading(false);
        return this.$store.state.me_info;
      }

      // util.loading(true);
      return null;
    },
    list(){
      return util._.map(this.$store.state.my_votes_list, (item)=>{
        //console.log(3, item)
        item.time = util.moment.unix(item.Vote_Header.Block_time).format('YYYY-MM-DD HH:mm');
        item.id = item.Vote_Header.Txid;
        item.number = item.Vote_Header.Value;
        item.node = item.Vote_Header.Node_num;


        return item;
      });
    }
  },
  mounted(){
       if(util.isSafari() || util.isIos()){
       this.isIos = true;
    }else{
       this.isIos = false;  
    }
    util._.delay(()=>{
      const ud = util.getUserData();
      console.log('user data =>', ud);
      if(ud){
        this.$store.dispatch('set_me_info', {});
      }
    }, 1500);

    

  }
}
</script>
<style lang="scss">
.p-myVotes{
  .c-rule{
    height: 128px;
    background: linear-gradient(to right, rgb(76, 85, 232) , rgb(128, 25, 255));
    text-align: center;
    display: flex;
    flex-direction: column;
    position: relative;

    .t1{
      color: rgb(189, 171, 249);
      margin-top: 32px;
      font-size: 15px;
    }
    .t2{
      color: #fff;
      margin-top: 5px;
      font-size: 23px;
    }
    .t3{
      position: absolute;
      right: 12px;
      bottom: 8px;
      color: rgb(189, 171, 249);
      font-size: 14px;
      background: transparent;
        border: none;
        }

   .t4 {
    position: absolute;
    left: 12px;
    bottom: 8px;
    color: #bdabf9;
    font-size: 14px;
    background: transparent;
    border: none;
}
  }

  .c-popup{
    width: 86vw;
    padding: 0 0 18px;
    text-align: left;

    .c-header{
      color: #545454;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      padding: 18px 0;
      border-bottom: 1px solid #e9e9e9;
    }

    .c-body{
      padding: 12px 25px;
      ul{
        list-style: square inside;
      }
      li{
        color: rgb(98, 98, 98);
        font-size: 15px;
        line-height: 20px;
      }

      .p1{
        margin-top: 15px;
        b{
          font-size: 14px;
        }
      }
      .p2{
        a{
          color: $blue_color;
          font-size: 15px;
          line-height: 16px;
          display: block;
          margin-top: 4px;
          word-break: break-all;
        }
      }
      .p3{
        margin-top: 18px;
        button{
          background: $blue_color;
        }
      }
    }
  }
  .mint-navbar{
    background-color: transparent;
  }

  .c-list{
    margin-top: 12px;
    padding-bottom: 15px;
  }

  .c-list1{
    margin-top: 12px;
    padding-bottom: 95px;
  }

}
</style>


