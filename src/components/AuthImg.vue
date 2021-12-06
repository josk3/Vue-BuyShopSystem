<template>
  <img ref="img"/>
</template>

<script>
import {getTokenKey} from "@/service/auth/token";
import store from '@/store'

export default {
  name: "AuthImg",
  props: {
    authSrc: {
      type: String,
      default: "",
    }
  },
  mounted() {
    Object.defineProperty(Image.prototype, 'auth-src', {
      writable: true,
      enumerable: true,
      configurable: true
    })
    let img = this.$refs.img
    let request = new XMLHttpRequest();
    request.responseType = 'blob';
    request.open('get', this.authSrc, true);
    request.setRequestHeader(getTokenKey(), store.getters.token);
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        img.src = URL.createObjectURL(request.response);
        img.onload = () => {
          URL.revokeObjectURL(img.src);
        }
      }
    };
    request.send(null);
  }
}
</script>