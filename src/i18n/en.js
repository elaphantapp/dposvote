import _ from 'lodash';
import C from './cty';

const country = {};
_.each(C, (item)=>{
  _.set(country, item.code, item.en);
});

export default {
  country,

  VOTING : 'Voting',
  RANK : 'Rank',
  FAV : 'Fav',
  LATEST : 'Latest',
  NODES : 'Nodes',
  FAVORITES : 'Favorites',
  MY_VOTES : 'My Votes',
  NODE_DETAILS : 'Node Details',
  SEARCH : 'search',
  VOTE : 'Vote',
  VOTING_POWER_USED : 'voting power Used',
  TOTAL : 'Total',
  RULE : 'Rule',
  ALL : 'All',
  SUCCESS : 'Success',
  FAILURE : 'Failure',
  VOTING_RULE : 'Voting Rule',
  rule_msg : {
    '1' : '1 ELA may be used to vote for a maximum of 36 different nodes and 1 ELA may only give the same node a maximum of 1 vote;',
    '2' : 'Your votes will be revoked when you spend your ELA, however, we provide an option for you to anto vote again using you balance when spending your ELA.',
    link : 'https://news.elastos.org/elastos-dpos-supernode-election-process/'
  },
  MORE_DETAIL : 'More Detail',
  RE_VOTE : 'Re-Vote',
  VOTES : 'Votes',
  STATUS : 'Status',
  LOCATION : 'Location',
  YEAR : 'year',
  EST : 'EST',
  PUBLIC_KEY : 'Public Key',
  CANCEL : 'Cancel',
  CLOSE : 'Close',

  '01' : 'votes',
  '02' : 'Vote',
  '03' : 'Votes %',
  '04' : 'Votes gap',
  '05' : 'copy successs'
};