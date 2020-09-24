<template>
    <div class="upload-img-once row" :class="cssType">
        <div class="col-6">
            <div v-if="disable === true">
                --
            </div>
            <div v-else>
                <el-upload
                        :class="css"
                        drag
                        accept="image/*"
                        action=""
                        :limit="1"
                        :on-change="changeImgFile"
                        :on-remove="removeImgFile"
                        :auto-upload="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">{{ txt }}</div>
                </el-upload>
            </div>
        </div>
        <div class="col-6">
            <div v-if="is_show">
                <img class="img-up-once" height="150" :src="img_url" alt="img" />
            </div>
        </div>
    </div>
</template>

<script>

    import {isEmpty} from "@/utils/validate";

    export default {
        name: "UploadImgOnce",//上传一个图片文件
        props: ['txt', 'size', 'css', 'img_url', 'disable'],
        data() {
            return {
                loading: false,
                is_show: false,
                cssType: this.size + '-box-up',
            }
        },
        watch: {
            img_url(newVal) {
                if (!isEmpty(newVal) && newVal !== '--') this.is_show = true
            }
        },
        mounted() {
        },
        methods: {
            changeImgFile(e) {
                this.is_show = false
                this.$emit('img', e.raw)
            },
            removeImgFile() {
                this.is_show = false
                this.$emit('img', '')
            },
        },

    }
</script>
<style>
    .upload-img-once .el-upload__tip {
        line-height: 12px;
        margin-top: 0;
    }

    .sm-box-up .el-upload-dragger {
        width: 150px;
        height: 150px;
    }

    .sm-box-up .el-upload-dragger .el-icon-upload {
        line-height: 30px;
        margin-top: 20px;
    }

    .img-up-once {
        min-height: 30px;
        min-width: 30px;
    }

</style>
