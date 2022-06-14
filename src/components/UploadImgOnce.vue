<template>
    <div class="upload-img-once row" :class="cssType">
        <div v-if="disable === true">
            --
        </div>
        <div v-else class="col-12">
            <div class="top_tip" slot="tip" v-if="accept_pdf === true">
                {{ $t("user.please_follow") }}
                <a target="_blank" class="download-trigger text-blue" :href="img_url_demo"> {{ $t("user.sample_template") }}</a>
                ,{{ img_url_tip }}
            </div>
            <div class="top_tip" slot="tip" v-else>
                {{ $t("user.please_follow") }}
                <el-popover placement="top" trigger="click">
                    <img class="img-up-once" height="400" :src="img_url_demo" alt="img" /><span class="text-blue" style="cursor:pointer;" slot="reference">{{ $t("user.sample_template") }}</span> </el-popover
                >,{{ img_url_tip }}
            </div>
            <div style="display:flex;padding-top: 8px;">
                <div class="col-6" style="padding-left:0px;padding-right:0px;">
                    <el-upload :class="css" drag :accept="accept_pdf === true ? 'image/*,.pdf' : 'image/*'" action="" :limit="1" :on-change="changeImgFile" :on-remove="removeImgFile" :auto-upload="false">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                            {{ $t("comm.upload_file_drag_click[0]") }}
                            <em> {{ $t("comm.upload_file_drag_click[1]") }}</em>
                        </div>
                        <div class="el-upload__tip" slot="tip" v-if="accept_pdf === true">{{ $t("bank.upload_authorize_photo_tip") }}</div>
                        <div class="el-upload__tip" slot="tip" v-else>{{ $t("user.upload_picture_tip") }}</div>
                        <div class="el-upload__tip" slot="tip">{{ txt }}</div>
                    </el-upload>
                </div>
                <div class="col-6">
                    <div v-if="is_show">
                        <img class="img-up-once" height="150" :src="img_url" alt="img" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { isEmpty } from "@/utils/validate";

    export default {
        name: "UploadImgOnce", //上传一个图片文件
        props: ["txt", "size", "css", "img_url", "disable", "img_url_tip", "img_url_demo", "accept_pdf"],
        data() {
            return {
                loading: false,
                is_show: false, //显示图片
                update_box_show: true, //上传框显示
                sizeType: this.size + "-box-up",
                cssType: "",
            };
        },
        watch: {
            img_url(newVal) {
                this.update_box_show = true;
                this.checkImgUrl(newVal);
            },
            update_box_show(newVal) {
                if (newVal === true) {
                    this.cssType = this.sizeType;
                } else {
                    this.cssType = this.sizeType + " hide-box";
                }
            },
        },
        mounted() {
            this.checkImgUrl(this.img_url);
            this.cssType = this.sizeType;
        },
        methods: {
            checkImgUrl(val) {
                if (!isEmpty(val) && val !== "--") this.is_show = true;
            },
            changeImgFile(e, fileList) {
                const isLt500K = e.raw.size / 1024 < 500;
                if (isLt500K) {
                    this.is_show = false;
                    this.$emit("img", e.raw);
                    this.update_box_show = false; //只给上传一张
                } else {
                    this.$message.error(this.$i18n.t("user.upload_exceed_tip"));
                    for (var i = 0; i < fileList.length; i++) {
                        if (fileList[i].uid == e.uid) {
                            fileList.splice(i, 1);
                        }
                    }
                }
            },
            removeImgFile() {
                this.update_box_show = true;
                this.is_show = false;
                this.$emit("img", "");
            },
        },
    };
</script>
<style>
    .top_tip {
        margin-top: 8px;
    }

    .upload-img-once .el-upload__tip {
        line-height: 12px;
    }

    .upload-img-once .el-upload__tip1 {
        margin-top: 0;
    }

    .sm-box-up .el-upload-dragger {
        width: 150px;
        height: 150px;
        word-break: keep-all;
    }

    .sm-box-up .el-upload-dragger .el-icon-upload {
        line-height: 30px;
        margin-top: 20px;
    }

    .hide-box .el-upload-dragger {
        display: none;
    }

    .img-up-once {
        min-height: 30px;
        min-width: 30px;
    }
</style>
<style scoped>
    ::v-deep .el-upload-dragger .el-upload__text {
        margin-top: 10px;
    }
</style>
