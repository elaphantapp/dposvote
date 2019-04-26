import _ from 'lodash';
import C from './cty';

const country = {};
_.each(C, (item) => {
    _.set(country, item.code, item.zh);
});
export default {
    country,

    VOTING: '投票',
    RANK: '排名',
    FAV: '最爱',
    LATEST: '最新',
    NODES: '节点',
    FAVORITES: '最爱',
    MY_VOTES: '我的投票',
    NODE_DETAILS: '节点信息',
    SEARCH: '搜索',
    VOTE: '票',
    VOTING_POWER_USED: '投票权 已用',
    TOTAL: '总共',
    RULE: '规则',
    ALL: '全部',
    SUCCESS: '成功',
    FAILURE: '失败',
    VOTING_RULE: '投票规则',
    rule_msg: {
        '1': '1个ELA最多给36个不同的节点投票，1个ELA给同一个节点最多只能投1票；',
        '2': '如果投票之后进行转出交易，会导致之前的投票失效，需要再次进行投票；您也可以在转出交易的同时勾选自动投票。',
        link: 'https://news-zh.elastos.org/亦来云dpos超级节点竞选细则/'
    },
    MORE_DETAIL: '更多信息',
    RE_VOTE: '重新投票',
    VOTES: '投票',
    STATUS: '状态',
    LOCATION: '位置',
    YEAR: '年',
    EST: '预估',
    PUBLIC_KEY: '节点公钥',
    CANCEL: '取消',
    CLOSE: '关闭',

    '01': '票',
    '02': '投票',
    '03': '票数占比',
    '04': '投票差距',
    '05': '拷贝成功',
    '06': '',
    '07': '',

    Activate: '可投票',
    Inactivate: '可投票（非活跃）',
    Pengding: '不可投票（注册中）'
};