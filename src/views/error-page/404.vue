<template>
  <div class="bg-white">
    <div id="page-404" class="text-center row">
      <div class="col-12"><h2>404</h2></div>
      <div class="col-12 row">
        <div class="col-3"></div>
        <div class="col-6">
          <div class="d-block">
            <ul class="list-unstyled list-inline">
              <li class="list-inline-item">
                <router-link :to="configs.homePath" class="btn btn-link mr-4">
                  {{ $t('nav.home') }}
                </router-link>
              </li>
              <li class="list-inline-item">
                <router-link :to="configs.loginPath" class="btn btn-link">
                  {{ $t('comm.login') }}
                </router-link>
              </li>
            </ul>
          </div>
          <img src="../../assets/images/404-0003.png" alt="404" class="img-fluid" >
        </div>
        <div class="col-3"></div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";
import configs from "@/configs";

export default {
  name: 'Page404',
  computed: {
    ...mapState({
      device: state => state.app.device,
    }),
    configs() {
      return configs;
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
