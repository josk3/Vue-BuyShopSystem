<template>
    <div class="search">
        <p>{{form.title}}</p>
        <el-divider></el-divider>
        <el-form :model="form" class="form" ref="form">
            <!-- 日期表组建 -->
            <el-form-item :label="$t('search.filtrate')" style=" margin-bottom: 0px; height: 65px;" prop="dateValue">
                <el-date-picker v-model="form.dateValue" :picker-options="pickerOptions" :clearable="false"
                                type="datetimerange" :start-placeholder="$t('search.startDate')"
                                :end-placeholder="$t('search.endDate')" range-separator="~"
                                prefix-icon='iconfont icon-rili' :default-time="['00:00:00', '23:59:59']"
                                @change="search">
                </el-date-picker>
                <el-button size="medium" @click="today" ref="today" class="date_button" type="text">
                    {{$t('search.today')}}
                </el-button>
                <el-button size="medium" @click="yesterday" ref="yesterday" class="date_button" type="text">
                    {{$t('search.yesterday')}}
                </el-button>
                <el-button size="medium" @click="sevenDays" ref="sevenDays" class="date_button" type="text">
                    {{$t('search.lastWeek')}}
                </el-button>
                <el-button size="medium" @click="thirtyDays" ref="thirtyDays" class="date_button" type="text">
                    {{$t('search.lastMonth')}}
                </el-button>
            </el-form-item>

            <div class="inputList">
                <div style=" width: 30%;">
                    <el-form-item :label="form.inputName1" prop="inputValue1">
                        <el-input v-model="form.inputValue1" style=" height: 30px;"></el-input>
                    </el-form-item>
                </div>
                <div style=" width: 30%;">
                    <el-form-item :label="form.inputName2" prop="inputValue2">
                        <el-input v-model="form.inputValue2" style=" height: 30px;"></el-input>
                    </el-form-item>
                </div>
                <div style=" width: 30%;">
                    <el-form-item :label="form.inputName3" prop="inputValue3">
                        <el-input v-model="form.inputValue3" style=" height: 30px;"></el-input>
                    </el-form-item>
                </div>
            </div>

            <div class="buttonList">
                <el-button size="mini" @click="search" class="searchButton">
                    {{$t('search.search')}}
                </el-button>
                <el-button @click="resetForm('form')" size="mini" class="resetButton">{{$t('search.reset')}}
                </el-button>
            </div>

        </el-form>
    </div>
</template>

<script>
    import getDate from '@/utils/getDate'

    export default {
        name: "SearchBox",
        props: ['formData'],
        data() {
            return {
                form: this.formData,
                d: "",
                pickerOptions: {
                    shortcuts: [{
                        text: this.$t('search.today'),
                        onClick: (picker) => {
                            this.d = "today";
                            picker.$emit('pick', getDate(0));
                            this.search();
                        }
                    }, {
                        text: this.$t('search.yesterday'),
                        onClick: (picker) => {
                            this.d = "yesterday";
                            picker.$emit('pick', getDate(1));
                            this.search();
                        }
                    }, {
                        text: this.$t('search.lastWeek'),
                        onClick: (picker) => {
                            this.d = "sevenDays";
                            picker.$emit('pick', getDate(2));
                            this.search();
                        }
                    }, {
                        text: this.$t('search.lastMonth'),
                        onClick: (picker) => {
                            this.d = "thirtyDays";
                            picker.$emit('pick', getDate(3));
                            this.search();
                        }
                    }]
                },
            }
        },
        watch: {
            "d": function (newValue) {
                this.setColor();
                switch (newValue) {
                    case "today":
                        this.$refs.today.$el.style.color = '#1072B8';
                        break;
                    case "yesterday":
                        this.$refs.yesterday.$el.style.color = '#1072B8';
                        break;
                    case "sevenDays":
                        this.$refs.sevenDays.$el.style.color = '#1072B8';
                        break;
                    case "thirtyDays":
                        this.$refs.thirtyDays.$el.style.color = '#1072B8';
                        break;
                }
            }
        },
        methods: {
            // 日期方法
            setColor() {
                this.$refs.today.$el.style.color = '#2C2E2F';
                this.$refs.yesterday.$el.style.color = '#2C2E2F';
                this.$refs.sevenDays.$el.style.color = '#2C2E2F';
                this.$refs.thirtyDays.$el.style.color = '#2C2E2F';
            },
            today() {
                this.setColor();
                this.$refs.today.$el.style.color = '#1072B8';
                this.$data.form.dateValue = getDate(0);
                this.search();
            },
            yesterday() {
                this.setColor();
                this.$refs.yesterday.$el.style.color = '#1072B8';
                this.$data.form.dateValue = getDate(1);
                this.search();
            },
            sevenDays() {
                this.setColor();
                this.$refs.sevenDays.$el.style.color = '#1072B8';
                this.$data.form.dateValue = getDate(2);
                this.search();
            },
            thirtyDays() {
                this.setColor();
                this.$refs.thirtyDays.$el.style.color = '#1072B8';
                this.$data.form.dateValue = getDate(3);
                this.search();
            },
            search() {
                let dateList = [];
                if (this.form.dateValue != null && this.form.dateValue.length !== 0) {
                    dateList = [this.form.dateValue[0].Format('yyyy-MM-dd hh:mm:ss'), this.form.dateValue[1].Format('yyyy-MM-dd hh:mm:ss')]
                } else {
                    dateList = []
                }
                this.$emit('func', dateList, this.form.inputValue1, this.form.inputValue2, this.form.inputValue3)
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
        mounted() {
            let dateList;
            if (this.form.dateValue != null && this.form.dateValue.length !== 0) {
                dateList = [this.form.dateValue[0].Format('yyyy-MM-dd hh:mm:ss'), this.form.dateValue[1].Format('yyyy-MM-dd hh:mm:ss')]
            } else {
                dateList = []
            }
            this.$emit('func', dateList)
        }
    }
</script>
<style lang="scss">
    .search .el-divider {
        background: #E4E8ED;
        margin: 20px 0;
    }
</style>
<style scoped>
    .search {
        margin: 20px 15px 0 15px;
        padding-bottom: 20px;
        background: #FFFFFF;
        color: #2C2E2F;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
    }

    .search p {
        font-size: 18px;
        padding: 20px 0 0 18px;
        line-height: 18px;
    }

    .form {
        margin: 0 18px;
        background-color: #EEF6FC;
        padding: 20px 14px;
    }

    .form .el-form-item {
        margin-bottom: 18px;
    }

    .date_button {
        color: #2C2E2F;
        font-size: 14px;
        margin-left: 18px;
        padding: 8px 0;
    }

    .search >>> .el-form-item__label {
        font-weight: 400;
        padding-right: 10px;
        color: #2C2E2F;
        line-height: 34px;
    }

    .search >>> .el-date-editor {
        width: 327px;
        height: 32px;
    }

    .search >>> .el-date-editor .el-range__icon {
        position: absolute;
        right: 4px;
        top: 0;
    }


    .search >>> .el-date-editor .el-range__close-icon {
        width: 0;
        height: 0;
    }

    .search >>> .el-date-editor .el-range-input {
        width: 44%;
    }

    .search >>> .el-range-editor--medium .el-range-input {
        font-size: 13px;
    }

    .search >>> .el-range-editor--medium.el-input__inner {
        height: 32px;
    }

    .search >>> .el-range-editor--medium .el-range-separator {
        margin-top: -5px;
    }

    .inputList {
        display: flex;
        justify-content: space-between;
    }

    .search >>> .el-form-item__content {
        display: flex;
    }

    .buttonList {
        display: flex;
        justify-content: flex-end;
    }

    .search >>> .el-input--medium .el-input__inner {
        height: 30px;
        line-height: 30px;
    }

    .searchButton {
        color: white;
        background-color: #1072B8;
    }

    .resetButton {
        color: #2C2E2F;
    }
</style>
