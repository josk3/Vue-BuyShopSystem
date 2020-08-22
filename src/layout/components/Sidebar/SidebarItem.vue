<template>
  <div v-if="!item.hidden">
     <li>
         <router-link :to="item.path">
             <el-button type="primary">
                 {{ item.path}} * {{ item.name }}
             </el-button>
         </router-link>
     </li>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {

  }
}
</script>
