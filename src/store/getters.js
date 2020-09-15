const getters = {
  sidebar: state => state.app.sidebar, //sidebar状态等 setup-config app.js
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token,
  fullName: state => state.user.full_name,
  roles: state => state.user.roles,
  menus: state => state.user.menus,//侧边目录
  lang: state => state.app.lang,//多语言
}
export default getters
