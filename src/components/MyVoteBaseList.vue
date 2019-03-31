<template>
  <mt-cell :to="'/vote_detail/'+data.id" class="cm-MyVoteBaseList" :title="data.number+'ELA'" is-link :label="data.time">
    <span class="t1">{{data.node}} nodes</span>
    <span class="t2">{{data.status}}</span>
  </mt-cell>
</template>
<script>
import util from '@/util';
export default {
  props : {
    data : null
  }
}
</script>
<style lang="scss">
.cm-MyVoteBaseList{
  text-align: left;
  background: rgb(242,242, 249) !important;

  .mint-cell-value{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .mint-cell-wrapper{
    height: 68px;
  }
  .t1{
    font-size: 17px;
    color: #333;
    font-weight: 400;
  }
  .t2{
    margin-top: 3px;
    font-size: 12px;
  }
}
</style>


