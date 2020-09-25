<template>
    <div :class="cssType">
        <ul v-if="list" class="list-group list-group-horizontal-sm wpy-group-nav">
            <li class="list-group-item"
                v-for="item in list"
                :key="item.name"
                :style="itemStyle"
                :class="checkCurrentItem(item) ? 'active-item' : ''"
                @click="changeItem(item)">
                <span class="item-label">{{item.label}}</span>
            </li>
        </ul>
    </div>
</template>

<script>

    import {isArray, isEmpty} from "@/utils/validate";

    export default {
        name: "GroupNav",
        props: ['list', 'active', 'nav-click'],
        data() {
            return {
                loading: false,
                cssType: '',
                itemStyle: '',
                currentActive: '',
            }
        },
        watch: {},
        mounted() {
            if (!isEmpty(this.list) && isArray(this.list) && this.list.length > 0) {
                this.itemStyle = 'width:' + (100 / this.list.length) + '%';
            }
            this.currentActive = this.active
        },
        methods: {
            checkCurrentItem(item) {
                if (!isEmpty(item) && !isEmpty(this.currentActive)) {
                    return this.currentActive === item.name
                } else {
                    return false
                }
            },
            changeItem(item) {
                if (!isEmpty(item)) {
                    this.currentActive = item.name
                    this.$emit('nav-click', item.name)
                }
            },
        },

    }
</script>
<style>
    .wpy-group-nav {
        padding: 5px 10px;
    }

    .wpy-group-nav .list-group-item {
        padding: 8px 0;
        text-align: center;
        cursor: pointer;
    }

    .wpy-group-nav .active-item .item-label {
        color: #267dd5;
        font-weight: bold;
    }
</style>
