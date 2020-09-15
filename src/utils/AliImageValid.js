import Vue from 'vue'
/**
 * 人机验证, 图形验证码-阿里
 */
// nch5 //g.alicdn.com/sd/nch5/index.js?t=2015052012
import aliCaptcha from '@/assets/js/nch5';
import {isEmpty} from "@/utils/validate";

export default function AliImageValid(appKey, callback, lang) {
  var nc_token = [appKey, (new Date()).getTime(), Math.random()].join(':');
  if (isEmpty(aliCaptcha)) {
    Vue.prototype.$message({
      message: '网络出错',
      type: 'error',
      duration: 1500
    })
  }
  var nc=NoCaptcha.init({
    renderTo: '#nc',
    appkey: appKey,
    scene: 'nc_login_h5',
    token: nc_token,
    trans: {"key1": "code200"},
    elementID: ["usernameID"],
    is_Opt: 0,
    language: "cn",
    timeout: 10000,
    retryTimes: 5,
    errorTimes: 5,
    inline:false,
    apimap: {
      // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
      // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
    },
    bannerHidden:false,
    initHidden:false,
    callback: function (data) {
      callback(data)
    },
    error: function (s) {
      Vue.prototype.$message({
        message: s.message,
        type: 'error',
        duration: 1500
      })
    }
  });
  //
  NoCaptcha.setEnabled(true);
  nc.reset();//请务必确保这里调用一次reset()方法

  if (lang === 'en') {
    NoCaptcha.upLang('en');
  }else {
    NoCaptcha.upLang('cn', {
      'LOADING': "加载中...",//加载
      'SLIDER_LABEL': "请向右滑动验证",//等待滑动
      'CHECK_Y': "验证通过",//通过
      'ERROR_TITLE': "非常抱歉，这出错了...",//拦截
      'CHECK_N': "验证未通过", //准备唤醒二次验证
      'OVERLAY_INFORM': "经检测你当前操作环境存在风险，请输入验证码",//二次验证
      'TIPS_TITLE': "验证码错误，请重新输入"//验证码输错时的提示
    });
  }
}
