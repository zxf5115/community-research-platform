import  {common}  from './system/platform/common/zh'
import  {login}  from './system/platform/login/zh'
import  {user}  from './system/platform/user/zh'
import  {menu}  from './system/platform/menu/zh'
import  {message}  from './system/platform/message/zh'
import  {config}  from './system/platform/config/zh'
import  {setting}  from './system/platform/setting/zh'
import  {log}  from './system/platform/log/zh'




// ---------------------------------------
// 模块

import  {questionnaire}  from './module/platform/questionnaire/zh'
import  {house}  from './module/platform/house/zh'

export default {

  // 公共
  common: {
    ...common
  },

  // 登录
  login: {
    ...login
  },

  // 用户
  user: {
    ...user
  },

  // 菜单
  menu: {
    ...menu
  },

  // 消息
  message: {
    ...message
  },

  // 配置
  config: {
    ...config
  },

  // 设置
  setting: {
    ...setting
  },

  // 日志
  log: {
    ...log
  },

  // ------------------------------------

  // 调查问卷
  questionnaire: {
    ...questionnaire
  },

  // 楼宇
  house: {
    ...house
  },
}
