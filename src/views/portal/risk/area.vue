<template>
    <div>
        <div class="risk-area-list">
            <SearchBox :params="searchParams" @search="search"></SearchBox>
            <div class="wrap-tab p-0" v-loading="loading">
                <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                    <div class="row">
                        <div class="col-12 text-left p-0" style="background-color: #F5F7FA">
                            <div class="ml-5 mt-1 mb-1">
                                <el-button icon="el-icon-plus" size="small"
                                           @click="addRiskAreaDialog" plain>{{$t('risk.add_risk_area')}}
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <el-table
                            :class="tabData.list.length ? '' : 'wpy-z-table'"
                            :data="tabData.list"
                            :header-row-style="{background:'#2C2E2F'}"
                            style="width: 100%">
                        <el-table-column
                                prop="country_name"
                                :label="$t('comm.country_name')">
                            <template v-slot="scope">
                                {{scope.row.country_name }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="state_name"
                                :label="$t('risk.state_name')">
                            <template v-slot="scope">
                                {{scope.row.state_name }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                :label="$t('comm.status')">
                            <template v-slot="scope">
                                {{scope.row.status | numberStatus}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="operator_name"
                                :label="$t('comm.operator')">
                            <template v-slot="scope">
                                {{scope.row.operator_name }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="updated"
                                :label="$t('comm.created')">
                            <template v-slot="scope">
                                {{scope.row.updated | toDay}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="remark"
                                :show-overflow-tooltip="true"
                                :label="$t('comm.remark')">
                            <template v-slot="scope">
                                {{scope.row.remark }}
                            </template>
                        </el-table-column>
                        <el-table-column width="50" fixed="right">
                            <template v-slot="scope">
                                <el-dropdown trigger="click" :data-row="scope.row" @command="handleCommand">
                                      <span class="el-dropdown-link">
                                          <i class="el-icon-more"></i>
                                      </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-if="scope.row.status === 1" icon="el-icon-turn-off"
                                                          :command="commandVal('disable', scope.row, scope.$index)">
                                            {{$t('comm.disable')}}
                                        </el-dropdown-item>
                                        <el-dropdown-item v-if="scope.row.status === 0" icon="el-icon-open"
                                                          :command="commandVal('enable', scope.row, scope.$index)">
                                            {{$t('comm.enable')}}
                                        </el-dropdown-item>
                                        <el-dropdown-item icon="el-icon-delete" divided
                                                          :command="commandVal('delete', scope.row, scope.$index)">
                                            {{$t('comm.del')}}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                    <Pagination :page="tabData.page" @change="pageChange"></Pagination>
                </el-card>
                <!--        ||        -->
                <el-dialog custom-class="wpy-dialog sm-dialog bg-body"
                           :show-close="false" :close-on-click-modal="false"
                           :title="$t('risk.add_risk_area')"
                           v-loading="loading"
                           :visible.sync="riskAreaDialogVisible">
                    <div>
                        <el-card shadow="hover" class="box-card p-3 mb-3"
                                 :body-style="{ padding: '0px' }">
                            <div class="text-muted p-0">
                                <i class="el-icon-info text-blue"></i> {{$t('risk.risk_area_order_will_block')}} (Billing)
                            </div>
                        </el-card>
                        <el-form ref="risk_area_form"
                                 :model="risk_area_form"
                                 :rules="rules" label-width="90px" class="pr-4">
                            <el-form-item :label="$t('comm.country_name')" prop="select_country">
                                <el-select v-model="risk_area_form.select_country" :placeholder="$t('comm.country_name')"
                                           value-key="iso2"
                                           @change="selectCountry" filterable clearable>
                                    <el-option
                                            v-for="item in area_all_list"
                                            :key="item.iso2"
                                            :label="item.name + ' (' + item.iso2 + ')'"
                                            :value="item">
                                        <span style="float: left">{{ item.name }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.iso2 }}</span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('risk.state_name')" prop="select_state">
                                <el-select v-if="area_states_list" v-model="select_state" :placeholder="$t('risk.state_name')"
                                           :validate-event="false"
                                           value-key="id"
                                           @change="selectState" filterable clearable>
                                    <el-option
                                            v-for="state in area_states_list"
                                            :key="state.id"
                                            :label="state.name + ' (' + state.state_code + ')'"
                                            :value="state">
                                        <span style="float: left">{{ state.name }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">{{ state.state_code }}</span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('comm.remark')">
                                <el-input type="textarea" v-model="risk_area_form.remark"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="riskAreaDialogVisible = false">{{$t('comm.cancel')}}</el-button>
                        <el-button size="mini" type="primary" @click="submitRiskArea">{{$t('comm.submit')}}</el-button>
                    </div>
                </el-dialog>

            </div>
        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import SearchBox from "@/components/SearchBox";
    import Pagination from "@/components/Pagination";
    import {
        getAreaJsonData,
        riskAreaAdd,
        riskAreaDel,
        riskAreaDisable,
        riskAreaEnable,
        riskAreaSearch
    } from "@/service/riskAreaSer";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "risk_area",
        components: {SearchBox, Pagination},
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                riskAreaDialogVisible: false,
                risk_area_form: this.initAreaFormObj(),
                select_state: null, //当前选择值
                area_all_list: [],//所有国家数据
                area_states_list: {},//对应国家所有洲省数据
                rules: {
                    select_country: [
                        {required: true, message: this.validMsg('comm.country_name'), trigger: 'blur'},
                    ],
                },
                searchParams: {
                    title: 'nav.risk_manage', page: 1,
                    country_name: ''
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
            }
        },
        mounted() {
            this.search();
        },
        methods: {
            validMsg(name) {
                return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
            },
            pageChange(page) {
                this.searchParams.page = page.page_num
                this.search()
            },
            search() {
                this.loading = true
                riskAreaSearch(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            addRiskAreaDialog() {
                if (isEmpty(this.area_all_list) || this.area_all_list.length <= 0) {
                    this.$data.loading = true
                    getAreaJsonData().then(res => {
                        const {data} = res
                        this.$data.area_all_list = data
                    }).finally(() => {
                        this.$data.loading = false
                    })
                }
                this.initRiskAreaForm()
                this.risk_area_form.action = 'add'
                this.riskAreaDialogVisible = true
            },
            initAreaFormObj() {
                return {
                    action: '',
                    index: '',
                    country_name: '',
                    state_name: '',
                    select_country: '',
                    select_state: '',
                    remark: ''
                };
            },
            initRiskAreaForm() {
                this.risk_area_form = this.initAreaFormObj()
                this.select_state = null
            },
            submitRiskArea() {
                this.$refs['risk_area_form'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        let countryObj = this.risk_area_form.select_country;
                        let stateObj = this.risk_area_form.select_state;
                        this.risk_area_form.country_name = !isEmpty(countryObj) ? countryObj.iso2 : ''
                        this.risk_area_form.state_name = !isEmpty(stateObj) ? stateObj.state_code : ''
                        if (isEmpty(this.risk_area_form.state_name)) {
                            this.$message.error('请选择洲省')
                        } else {
                            this.$data.loading = true
                            this.risk_area_form.select_state = null
                            this.risk_area_form.select_country = null
                            riskAreaAdd(this.$data.risk_area_form).then(() => {
                                this.$data.riskAreaDialogVisible = false
                                this.search()
                                this.$message.success(this.$i18n.t('comm.success').toString())
                            }).finally(() => {
                                this.$data.loading = false
                            })
                        }
                    }
                });
            },
            selectCountry(val) {
                let allState = {
                    "id": 0,
                    "name": "All",
                    "state_code": "all"
                };
                this.select_state = null
                if (isEmpty(val)) {
                    this.area_states_list = []
                } else {
                    if (isEmpty(val.states) || val.states.length <= 0) {
                        this.area_states_list = [allState]
                        this.select_state = allState
                        this.risk_area_form.select_state = allState
                    } else {
                        this.area_states_list = [allState].concat(val.states)
                    }
                }
            },
            selectState(val) {
                this.risk_area_form.select_state = val
            },
            commandVal(action, row, index) {
                return {action: action, row: row, index: index}
            },
            handleCommand(command) {
                let row = command.row
                switch (command.action) {
                    case 'enable':
                        this.loading = true
                        riskAreaEnable(row).then(() => {
                            row.status = 1
                            this.$message.success(this.$i18n.t('comm.success').toString())
                        }).finally(() => {
                            this.$data.loading = false
                        })
                        break;
                    case 'disable':
                        this.loading = true
                        riskAreaDisable(row).then(() => {
                            row.status = 0
                            this.$message.success(this.$i18n.t('comm.success').toString())
                        }).finally(() => {
                            this.$data.loading = false
                        })
                        break;
                    case 'delete':
                        this.loading = true
                        riskAreaDel({rai: row.rai}).then(() => {
                            this.search()
                            this.$message.success(this.$i18n.t('comm.success').toString())
                        }).finally(() => {
                            this.$data.loading = false
                        })
                        break;
                }
            },
        },
    }
</script>

<style scoped>

</style>
