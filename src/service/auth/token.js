import Cookies from 'js-cookie'
import user from "@/store/modules/user";

const TokenKey = 'Wp-Token'

export function getTokenKey() {
  return TokenKey;
}

export function getToken() {
  let token = Cookies.get(TokenKey);
  return token || user.state.token;
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
