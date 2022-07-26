import Cookies from 'js-cookie'

const TokenKey = 'Wp-Token'
//lang Wp-Lang

export function getTokenKey() {
  return TokenKey;
}

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
	
  return Cookies.remove(TokenKey)
}

export function getIdentityMessageboxID() {
  return Cookies.get('showIdentityMessagebox');
}

export function setIdentityMessageboxID(value) { 
	return Cookies.set('showIdentityMessagebox', value)
}

export function removeIdentityMessageboxID() {
	return Cookies.remove('showIdentityMessagebox')
}



