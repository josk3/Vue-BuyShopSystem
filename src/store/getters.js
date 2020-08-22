const getters = {
  sidebar: state => state.app.sidebar, //sidebar状态等 setup-config app.js
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  menus: state => state.user.menus,//侧边目录
}
export default getters
