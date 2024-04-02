<template>
  <div v-loading="loading">
    <div class="row">
      <div class="col-12 mb-2">
        <el-card shadow="always" class="box-card p-3" :body-style="{ padding: '0px' }">
          <div class="text-muted p-0">
            <i class="el-icon-info text-blue"></i> {{ $t("user.mer_no") }}: <strong>{{ user.mer_no }}</strong>
          </div>
        </el-card>
      </div>
    </div>
    <div class="wrap-tab p-0">
      <el-card class="box-card wpy-card mb-2" shadow="never" :body-style="{ padding: '0px' }">
        <div slot="header" class="clearfix">
          <span>{{ $t("account.base_info") }}</span>
        </div>
        <div>
          <div v-if="info" class="row info-control-list">
            <div class="col-6">
              <div class="row">
                <label class="col-4">{{ $t("account.name_and_company") }}</label>
                <div class="col-8">
                  <span>{{ info.name }}</span>
                </div>
              </div>
              <div class="row">
                <label class="col-4">
                  <el-popover placement="top-start" width="200" trigger="hover" content="对接接口配置要使用">
                    <span slot="reference">Md5Key <i class="el-icon-warning-outline"></i></span>
                  </el-popover>
                </label>
                <div class="col-8">
                  <ShowMoreBtn :txt="info.md5_key"></ShowMoreBtn>
                </div>
              </div>
              <div class="row">
                <label class="col-4">{{ $t("account.register_time") }}</label>
                <div class="col-8">
                  <span>{{ info.created | toDay }}</span>
                </div>
              </div>
              <div class="row">
                <label class="col-4">{{ $t("account.online_time") }}</label>
                <div class="col-8">
                  <span>{{ info.online_date | toDay }}</span>
                </div>
              </div>
              <div class="row">
                <label class="col-4">{{ $t("account.expire_time") }}</label>
                <div class="col-8">
                  <span>{{ info.expire_date | toDay }}</span>
                </div>
              </div>
              <div class="row">
                <label class="col-4">{{ $t("account.settle_cycle") }}</label>
                <div class="col-8">
                  <span>{{ info.settlement_cycle | settleCycle }}</span>
                </div>
              </div>
              <div class="row">
                <label class="col-4">{{ $t("comm.processing_fees") }}</label>
                <div class="col-8">
                  <span>{{ info.fixed_fees | nullToLine }}USD</span>
                </div>
              </div>
              <div class="row">
                <label class="col-4">{{ $t("comm.fees") }}</label>
                <div class="col-8">
                  <span>{{ info.fees_rate | tradeFeeStr }}</span>
                </div>
              </div>
              <div class="row" v-if="other_info">
                <label class="col-4">{{ $t("comm.currency") }}</label>
                <div class="col-8">
                  <span>{{ other_info.trade_currencies }}</span>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row">
                <label class="col-4">{{ $t("account.ecm_current_month") }}</label>
                <div class="col-8">
                  <div v-html="ecmRateHtml(info.monitor_ecm)"></div>
                </div>
              </div>
              <div class="row">
                <label class="col-4">{{ $t("account.chargeback_count_current_month") }}</label>
                <div class="col-8">
                  <span>{{ info.declined_num | nullToLine }}</span>
                </div>
              </div>
              <div class="row">
                <label class="col-4">{{ $t("account.ecm_account") }}</label>
                <div class="col-8">
                  <div v-html="ecmRateHtml(info.total_ecm)"></div>
                </div>
              </div>
              <div class="row">
                <label class="col-4">{{ $t("account.chargeback_count_account") }}</label>
                <div class="col-8">
                  <span>{{ info.total_declined_num | nullToLine }}</span>
                </div>
              </div>
              <div class="row">
                <label class="col-4">{{ $t("account.ecm_last_month") }}</label>
                <div class="col-8">
                  <div v-html="ecmRateHtml(info.last_monthly_ecm)"></div>
                </div>
              </div>
              <div class="row mb-0">
                <label class="col-4">{{ $t("account.chargeback_fees") }}</label>
                <div class="col-8">
                  <span>{{ info.chargeback_fees | nullToLine }}{{ $t("account.chargeback_fees_info") }}</span>
                </div>
              </div>
              <div class="row mb-0">
                <label class="col-4">{{ $t("account.chargeback_warn_fees") }}</label>
                <div class="col-8">
                  <span>{{ $t("account.chargeback_warn_fees_info") }}</span>
                </div>
              </div>
              <div class="row mb-0">
                <label class="col-4">{{ $t("account.refund_fees") }}</label>
                <div class="col-8">
                  <span>${{ info.refund_fees|nullToLine}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-10 pl-1 pr-2 pb-2" v-if="paymentMethodFees && paymentMethodFees.length > 0">
                  <el-table size="mini" :data="paymentMethodFees">
                    <el-table-column prop="payment_method" :label="$t('order.payment_method')" width="120">
                      <template v-slot="scope">
                        <span class="payment-method" :class="['pm-' + scope.row.payment_method]" style="width: 100px;height: 30px;"></span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="fee_rate" :label="$t('finance.fees')" width="80">
                      <template v-slot="scope">
                        {{scope.row.fee_rate|feeRateToPercent}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="fee_rate" :label="$t('finance.per_fee')" width="80">
                      <template v-slot="scope">
                        <span v-if="scope.row.per_fee">$</span>
                        {{scope.row.per_fee|nullToLine}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="fee_rate" :label="$t('finance.refund_fee')" width="80">
                      <template v-slot="scope">
                        <span v-if="scope.row.refund_fee">$</span>
                        {{scope.row.refund_fee|nullToLine}}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>

                <div class="col-10 pl-1 pr-2 pb-2" v-if="ecmRuleData && ecmRuleData.length > 0">
                  <el-table class="ecm-list-table" :data="ecmRuleData" :show-header="false"
                            :row-class-name="ecmMatchClass">
                    <el-table-column prop="amount" width="90">
                      <template v-slot="scope"> {{ scope.row.amount }}$/{{ $t("account.per_order") }}</template>
                    </el-table-column>
                    <el-table-column>
                      <template v-slot="scope">
                        <span v-if="scope.row.condition_ecm_l"> {{ scope.row.condition_ecm_l }} &lt; </span>
                        {{ $t("account.ecm_condition_info[0]") }}
                        <span v-if="scope.row.condition_ecm_r"> ≤ {{ scope.row.condition_ecm_r }} </span>
                        <span v-if="scope.row.condition_order_count">
                                                    Or
                                                    {{ $t("account.ecm_condition_info[1]") }}≤
                                                    {{ scope.row.condition_order_count }}
                                                </span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <!--            -->
      <el-card class="box-card wpy-card mb-2" shadow="never" :body-style="{ padding: '0px' }">
        <div slot="header" class="clearfix">
          <span>{{ $t("bank.settle_bank") }}</span> <small
            v-show="add_bank.status === 1 || add_bank.status === 2 || add_bank.status === 3"> <i
            class="el-icon-info text-blue"></i> {{ add_bank.status | identityStatus }}</small>
        </div>
        <div class="row">
          <div class="col-10">
            <div v-if="add_bank.status === 1 || add_bank.status === 2" class="info-control-list">
              <!-- <div class="row">
                  <label class="col-4">{{ $t("bank.card_type") }}</label>
                  <div class="col-8">
                      <span>{{ add_bank.card_type_str }}</span>
                  </div>
              </div> -->
              <div class="row">
                <label class="col-4">{{ $t("bank.name") }}</label>
                <div class="col-8">
                  <span>{{ add_bank.card_account_name }}</span>
                </div>
              </div>
              <div class="row">
                <label class="col-4">{{ $t("bank.bank_name") }}</label>
                <div class="col-8">
                  <span>{{ add_bank.bank_name }}</span>
                </div>
              </div>
              <div class="row">
                <label class="col-4">{{ $t("bank.card_no") }}</label>
                <div class="col-8">
                  <ShowMoreBtn :txt="add_bank.card_no"></ShowMoreBtn>
                </div>
              </div>
              <div class="row" v-show="add_bank.card_identity_number">
                <label class="col-4">{{ $t("bank.card_identity_number") }}</label>
                <div class="col-8">
                  <span>{{ add_bank.card_identity_number }}</span>
                </div>
              </div>
              <div class="row" v-show="add_bank.bank_card_mobile">
                <label class="col-4">{{ $t("bank.bank_card_mobile") }}</label>
                <div class="col-8">
                  <span>{{ add_bank.bank_card_mobile }}</span>
                </div>
              </div>
              <div class="row">
                <label class="col-4">{{ $t("comm.created") }}</label>
                <div class="col-8">
                  <span>{{ add_bank.created | toDay }}</span>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="p-3">
                <el-button type="primary" plain @click="addBankBtn">
                  {{ $t("bank.add_bank") }}
                </el-button>
                <span style="margin-left:20px;">{{ $t("bank.add_bank_tip") }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <!--            -->
      <el-card v-if="this.user.is_master" class="box-card wpy-card mb-2" shadow="never"
               :body-style="{ padding: '0px' }">
        <div slot="header" class="clearfix">
          <span>Api Keys {{ $t("api_key.key") }}</span>
          <el-button size="mini" style="float:right;" @click="showCreateApiKey" type="primary" plain>
            {{ $t("api_key.create_api_key") }}
          </el-button>
        </div>
        <div class="p-3">
          <el-table
              :data="apiKeyData.list"
              :header-row-style="{background:'#2C2E2F'}"
              :loading="apikeyLoading"
              style="width: 100%">
            <el-table-column
                prop="key_name"
                :label="$t('api_key.key_name')">
            </el-table-column>
            <el-table-column
                prop="api_key"
                :label="$t('api_key.key')">
              <template v-slot="scope">
                <ShowMoreBtn :txt="scope.row.api_key"></ShowMoreBtn>
              </template>
            </el-table-column>
            <el-table-column
                prop="last_used"
                width="150"
                :label="$t('api_key.last_used')">
              <template v-slot="scope">
                {{ scope.row.last_used | toMinuteTime }}
              </template>
            </el-table-column>
            <el-table-column
                prop="created"
                width="100"
                :label="$t('api_key.create_time')">
              <template v-slot="scope">
                {{ scope.row.created | toDay }}
              </template>
            </el-table-column>
            <el-table-column
                width="130"
                label="">
              <template v-slot="scope">
                <el-button size="mini" type="text" @click="viewKeyLogs(scope.row.api_key)" class="ml-3">
                  {{ $t("api_key.view_log") }}
                </el-button>
                <el-popconfirm
                    :confirmButtonText="$t('comm.sure')"
                    :cancelButtonText="$t('comm.cancel')"
                    :title="$t('api_key.delete_key_confirm')" @confirm="delApiKey(scope.row)" :hideIcon="true">
                  <el-button slot="reference" size="mini" type="text" class="ml-3">
                    {{ $t("comm.del") }}
                  </el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-card>
      <!--    e   -->
    </div>

    <!--    d    -->
    <el-dialog custom-class="wpy-dialog sm-dialog"
               :show-close="false" :close-on-click-modal="false"
               :title="$t('api_key.create_api_key')"
               :visible.sync="createApiKeyDialogVisible">
      <div>
        <el-form ref="create_api_key"
                 :model="createApiKeyForm"
                 label-width="80px">
          <el-form-item :label="$t('api_key.key_name')">
            <el-input v-model="createApiKeyForm.name" style="width: 210px"></el-input>
            <br/>
            <small style="color: gray">{{ $t("api_key.key_name_info") }}</small>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" v-loading="apikeyLoading">
        <el-button size="mini" @click="createApiKeyDialogVisible = false">{{ $t('comm.cancel') }}</el-button>
        <el-button size="mini" type="primary"
                   :loading="apikeyLoading"
                   @click="createNewApiKey" class="ml-3">
          {{ $t('comm.sure') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog custom-class="wpy-dialog bg-dialog"
               :show-close="false" :close-on-click-modal="false"
               title="Logs"
               :visible.sync="keyLogDetailVisible">
      <div>
        <h6>
          {{logDetailItem.http_method}} {{logDetailItem.uri}}
        </h6>
        <el-descriptions class="margin-top" :column="3" size="small" border>
          <el-descriptions-item>
            <template slot="label">Status</template>
            {{logDetailItem.response_code}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">ID</template>
            {{logDetailItem.req_id}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">Time</template>
            {{logDetailItem.created |toFullTime}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">Ip</template>
            {{logDetailItem.request_ip}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">Message</template>
            {{logDetailItem.response_message}}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions :column="1" size="small" direction="vertical" border>
          <el-descriptions-item>
            <template slot="label">Request params</template>
            <code>
              {{logDetailItem.request_body}}
            </code>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">Response</template>
            <code>
              {{logDetailItem.response_body}}
            </code>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="keyLogDetailVisible = false">{{ $t('comm.close') }}</el-button>
      </div>
    </el-dialog>

    <el-drawer
        title="Logs"
        size="780px"
        :visible.sync="logDrawer">
      <div class="pl-3 pr-3 pb-3">
        <el-table
            :data="keyLogData.list"
            size="mini"
            :header-row-style="{background:'#2C2E2F'}"
            :loading="keyLogLoading"
            style="width: 100%">
          <el-table-column
              prop="http_status"
              width="70"
              label="status">
            <template v-slot="scope">
              <strong :class="scope.row.http_status == 200 ? 'text-green' : 'text-red'">{{scope.row.http_status}}</strong>
            </template>
          </el-table-column>
          <el-table-column
              prop="http_method"
              width="70"
              label="Method">
          </el-table-column>
          <el-table-column
              prop="req_id"
              width="130"
              label="Request Id">
          </el-table-column>
          <el-table-column
              prop="uri"
              width="230"
              label="URI">
          </el-table-column>
          <el-table-column
              prop="created"
              width="130"
              :label="$t('comm.created')">
            <template v-slot="scope">
              {{ scope.row.created | toDayTime }}
            </template>
          </el-table-column>
          <el-table-column
              width="100"
              label="">
            <template v-slot="scope">
              <el-button size="mini" type="text" @click="viewKeyLogDetail(scope.row)" class="ml-1">
                {{ $t("comm.view_detail") }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination :page="keyLogData.page" @change="logsPageChange"></Pagination>
      </div>
    </el-drawer>

    <el-dialog custom-class="wpy-dialog md-dialog bg-body" v-loading="loading" top="20px" @close="closeBankDialog"
               :show-close="false" :close-on-click-modal="false" :title="$t('bank.add_bank_account')"
               :visible.sync="addBankDialogVisible">
      <div>
        <div style="display:flex;justify-content:center;">
          <el-radio-group v-model="add_bank.card_country_type" @change="typeChange" style="margin-top:20px;">
            <el-radio-button label="inland" :disabled="inland_disabled">{{
                $t("bank.inland_bank_account")
              }}
            </el-radio-button>
            <el-radio-button label="outland" :disabled="outland_disabled">{{
                $t("bank.outland_bank_account")
              }}
            </el-radio-button>
          </el-radio-group>
        </div>
        <el-form ref="add_bank" :model="add_bank" :show-message="true" :rules="rules" label-width="165px"
                 class="pl-1 pr-3 pt-3 pb-0">
          <el-form-item prop="payee_type">
            <template slot="label">
              {{ $t("bank.payee_type") }}
            </template>
            <el-select v-model="add_bank.payee_type" :placeholder="$t('user.select_type')" @change="typeChange"
                       filterable>
              <el-option v-for="item in payeeTypeList" :key="item.value" :label="$t(item.text)" :value="item.value">
                <span style="float: left">{{ $t(item.text) }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="card_account_type">
            <template slot="label">
              {{ $t("bank.payee_account_type") }}
            </template>
            <el-select v-model="add_bank.card_account_type" :placeholder="$t('user.select_type')" @change="typeChange"
                       filterable>
              <el-option v-for="item in accountTypeList" :key="item.value" :label="$t(item.text)" :value="item.value"
                         :disabled="item.disabled">
                <span style="float: left">{{ $t(item.text) }}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="card_company_register_address"
                        v-show="add_bank.card_country_type === 'outland' && add_bank.card_account_type === 'company'">
            <template slot="label">
              <el-popover placement="top-start" width="240" trigger="hover"
                          :content="$t('bank.card_company_register_address_tip')">
                <span slot="reference">{{ $t("user.company_register_address") }} <i class="el-icon-warning-outline"></i></span>
              </el-popover>
            </template>
            <el-input v-model="add_bank.card_company_register_address"></el-input>
          </el-form-item>
          <el-form-item prop="select_country"
                        v-show="add_bank.card_country_type === 'outland' && add_bank.card_account_type === 'company'">
            <template slot="label">
              <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.bank_country_tip')">
                <span slot="reference">{{ $t("bank.bank_country") }} <i class="el-icon-warning-outline"></i></span>
              </el-popover>
            </template>
            <div style="display:flex;">
              <el-select v-model="add_bank.select_country" :placeholder="$t('comm.country_name')" value-key="iso2"
                         @change="selectCountry" filterable clearable>
                <el-option v-for="item in area_all_list" :key="item.iso2" :label="item.name + ' (' + item.iso2 + ')'"
                           :value="item">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.iso2 }}</span>
                </el-option>
              </el-select>
              <el-select v-if="area_states_list" v-model="select_state" :placeholder="$t('risk.state_name')"
                         :validate-event="false" value-key="id" @change="selectState" filterable clearable
                         style="margin-left:5px;">
                <el-option v-for="state in area_states_list" :key="state.id"
                           :label="state.name + ' (' + state.state_code + ')'" :value="state">
                  <span style="float: left">{{ state.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ state.state_code }}</span>
                </el-option>
              </el-select>
            </div>
          </el-form-item>

          <div class="outland_company"
               v-show="add_bank.card_country_type === 'outland' && add_bank.card_account_type === 'company'">
            <el-form-item prop="bank_address">
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.bank_address_tip2')">
                  <span slot="reference">{{ $t("bank.bank_address2") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <el-input v-model="add_bank.bank_address"></el-input>
            </el-form-item>
            <el-form-item prop="bank_name">
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.bank_name_tip2')">
                  <span slot="reference">{{ $t("bank.bank_name2") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <el-input v-model="add_bank.bank_name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('bank.route_mode')" prop="route_mode">
              <el-input v-model="add_bank.route_mode" disabled></el-input>
            </el-form-item>
            <el-form-item prop="bank_swift_no">
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.bank_swift_no_tip')">
                  <span slot="reference">{{ $t("bank.bank_swift_no") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <el-input v-model="add_bank.bank_swift_no"></el-input>
            </el-form-item>
            <el-form-item :label="$t('bank.bank_card_mobile')" prop="bank_card_mobile">
              <el-input v-model="add_bank.bank_card_mobile"></el-input>
            </el-form-item>
            <el-form-item prop="card_no">
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.card_no2')">
                  <span slot="reference">{{ $t("bank.card_no2") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <el-input v-model="add_bank.card_no" :placeholder="$t('bank.card_no_placeholder')"></el-input>
            </el-form-item>
            <el-form-item prop="name">
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.name_tip2')">
                  <span slot="reference">{{ $t("bank.name") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <el-input v-model="add_bank.name" :disabled="disable_name"></el-input>
            </el-form-item>
          </div>

          <div class="inland outland_personal"
               v-show="add_bank.card_country_type === 'inland' || add_bank.card_account_type === 'personal'">
            <el-form-item prop="name">
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.name_tip')">
                  <span slot="reference">{{ $t("bank.name") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <el-input v-model="add_bank.name" :disabled="disable_name"></el-input>
            </el-form-item>
            <el-form-item prop="bank_name">
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.bank_name_tip')">
                  <span slot="reference">{{ $t("bank.bank_name") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <el-input v-model="add_bank.bank_name"></el-input>
            </el-form-item>
            <el-form-item prop="select_country" v-if="add_bank.card_country_type === 'outland'">
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.bank_country_tip')">
                  <span slot="reference">{{ $t("bank.bank_country2") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <div style="display:flex;">
                <el-select v-model="add_bank.select_country" :placeholder="$t('comm.country_name')" value-key="iso2"
                           @change="selectCountry" filterable clearable>
                  <el-option v-for="item in area_all_list" :key="item.iso2" :label="item.name + ' (' + item.iso2 + ')'"
                             :value="item">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.iso2 }}</span>
                  </el-option>
                </el-select>
                <el-select v-if="area_states_list" v-model="select_state" :placeholder="$t('risk.state_name')"
                           :validate-event="false" value-key="id" @change="selectState" filterable clearable
                           style="margin-left:5px;">
                  <el-option v-for="state in area_states_list" :key="state.id"
                             :label="state.name + ' (' + state.state_code + ')'" :value="state">
                    <span style="float: left">{{ state.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ state.state_code }}</span>
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item prop="select_province" v-else>
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.bank_country_tip2')">
                  <span slot="reference">{{ $t("bank.bank_country2") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <el-cascader v-model="add_bank.select_province" @change="handleInlandCountryChange"
                           :options="inland_area_all_list" :props="{ value: 'code', label: 'name' }"
                           clearable></el-cascader>
            </el-form-item>
            <el-form-item prop="bank_address" v-show="add_bank.card_country_type === 'outland'">
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.bank_address_tip')">
                  <span slot="reference">{{ $t("bank.bank_address") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <el-input v-model="add_bank.bank_address"></el-input>
            </el-form-item>
            <el-form-item prop="bank_branch">
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.bank_branch_tip')">
                  <span slot="reference">{{ $t("bank.bank_branch") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <el-input v-model="add_bank.bank_branch"></el-input>
            </el-form-item>
            <el-form-item prop="card_no">
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.card_no_tip')">
                  <span slot="reference">{{ $t("bank.card_no") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <el-input v-model="add_bank.card_no"
                        :placeholder="add_bank.card_country_type === 'outland' ? $t('bank.card_no_placeholder') : ''"></el-input>
            </el-form-item>
            <el-form-item prop="inter_bank_no">
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover" :content="$t('bank.inter_bank_no_tip')">
                  <span slot="reference">{{ $t("bank.inter_bank_no") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <el-input v-model="add_bank.inter_bank_no"></el-input>
            </el-form-item>
            <el-form-item :label="$t('bank.card_identity_number')" prop="card_identity_number"
                          v-show="add_bank.card_account_type === 'personal'">
              <el-input v-model="add_bank.card_identity_number"></el-input>
            </el-form-item>
            <el-form-item :label="$t('bank.bank_card_mobile')" prop="bank_card_mobile">
              <el-input v-model="add_bank.bank_card_mobile"></el-input>
            </el-form-item>
          </div>
          <!-- 选择第三方时需授权书 -->
          <div class="third" v-show="add_bank.payee_type === 'third'">
            <el-form-item prop="authorization_relation">
              <template slot="label">
                <el-popover placement="top-start" width="240" trigger="hover"
                            :content="$t('bank.authorization_relation_tip')">
                  <span slot="reference">{{ $t("bank.authorization_relation") }} <i class="el-icon-warning-outline"></i></span>
                </el-popover>
              </template>
              <el-input v-model="add_bank.authorization_relation"></el-input>
            </el-form-item>

            <el-form-item :label="$t('bank.authorize_photo')" prop="authorize_photo" ref="authorize_photo">
              <div :class="cssType">
                <div class="top_tip" slot="tip">
                  {{ $t("comm.download") }}
                  <a target="_blank" class="download-trigger text-blue"
                     :href="add_bank.card_country_type === 'outland' ? outCompanyAuthorizationTemplate : companyAuthorizationTemplate">
                    {{ $t("user.sample_template") }}</a>
                  {{ $t("comm.download_Authorization_explain[1]") }}
                </div>
                <div class="col-10" style="padding-left:0;padding-top: 8px;">
                  <el-upload drag accept="image/*,.pdf" action="" :limit="1" :on-change="changeImgFile"
                             :on-remove="removeImgFile" :auto-upload="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      {{ $t("comm.upload_file_drag_click[0]") }}
                      <em> {{ $t("comm.upload_file_drag_click[1]") }}</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">{{ $t("bank.upload_authorize_photo_tip") }}</div>
                    <div class="el-upload__tip" slot="tip">1.{{
                        $t("comm.download_Authorization_explain[0]")
                      }}{{ $t("comm.download_Authorization_explain[1]") }}
                    </div>
                    <div class="el-upload__tip" slot="tip">2.{{ $t("bank.upload_Authorization_explain") }}</div>
                    <div class="el-upload__tip" slot="tip">3.{{ $t("comm.upload_table_ok") }}</div>
                  </el-upload>
                </div>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeBankDialog()">{{ $t("comm.cancel") }}</el-button>
        <el-button size="mini" type="primary" @click="submitAddBank">{{ $t("comm.confirm_submit") }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import configs from "@/configs";
import user from "@/store/modules/user";
import {mapState} from "vuex";
import ShowMoreBtn from "@/components/ShowMoreBtn";
import Pagination from "@/components/Pagination";
import {addBank, getMerIdentity, getMerInfo} from "@/service/merchantSer";
import {isEmpty} from "@/utils/validate";
import {math} from "@/utils/math";
import {getAreaJsonData, getInlandAreaJsonData} from "@/service/riskAreaSer";
import {createApiKey, deleteApiKey, getApiKeyList, keyLogs} from "@/service/merApiKeySer";
import {feeRateToPercent} from "@/filters";

export default {
  name: "merchant_info",
  components: {ShowMoreBtn, Pagination},
  computed: {
    //watch跟踪数据变化, 重点user, configs
    ...mapState({
      menus: state => state.user.menus,
    }),
    configs() {
      return configs;
    },
    user() {
      return user.state.user;
    },
  },
  watch: {
    update_box_show(newVal) {
      if (newVal === true) {
        this.cssType = this.sizeType;
      } else {
        this.cssType = this.sizeType + " hide-box";
      }
    },
  },
  data() {
    var checkIdNum = (rule, value, callback) => {
      //18位身份证规范检查
      const reg = /^([1-9][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/;
      this.validReg(reg, value, rule.field, callback);
    };
    var checkInlandName = (rule, value, callback) => {
      //只能汉字
      const reg = /^[\u4e00-\u9fa5]*$/;
      this.validReg(reg, value, rule.field, callback);
    };
    var checkInlandPhone = (rule, value, callback) => {
      //11位手机号
      const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      this.validReg(reg, value, rule.field, callback);
    };
    var checkNum = (rule, value, callback) => {
      //数字就行
      const reg = /^[0-9]*$/;
      this.validReg(reg, value, rule.field, callback);
    };
    var checkInlandInterBankNo = (rule, value, callback) => {
      //12位数字
      const reg = /^[0-9]{12}$/;
      this.validReg(reg, value, rule.field, callback);
    };
    var checkNameFourTwenty = (rule, value, callback) => {
      const reg = /^[\u4e00-\u9fa5]{4,20}$/;
      this.validReg(reg, value, rule.field, callback);
    };
    var validateUpload = (rule, value, callback) => {
      if (this.upload_flag) {
        return callback();
      } else {
        return callback(this.$i18n.t("valid.uploaded_field", [this.$i18n.t("bank." + rule.field)]));
      }
    };
    return {
      loading: false,
      hold_edit: false,
      info: {},
      bank: {},
      detail: {},
      other_info: {},
      //-
      addBankDialogVisible: false,
      add_bank: {},
      disable_name: true,
      inland_disabled: false,
      outland_disabled: false,
      select_state: null, //当前选择值
      area_all_list: [], //所有国家数据
      area_states_list: {}, //对应国家所有洲省数据
      inland_area_all_list: [],
      rules: {},
      //境内及境外个人
      rulesA: {
        card_country_type: [{required: true, message: this.validMsg("comm.type"), trigger: "change"}],
        payee_type: [{required: true, message: this.validMsg("bank.payee_type"), trigger: "change"}],
        card_account_type: [{required: true, message: this.validMsg("bank.payee_account_type"), trigger: "change"}],
        card_no: [
          {required: true, message: this.validMsg("bank.card_no"), trigger: "blur"},
          {validator: checkNum, trigger: "blur"},
        ],
      },
      //境内个人
      rulesB: {
        card_identity_number: [
          {required: true, message: this.validMsg("bank.card_identity_number"), trigger: "blur"},
          {validator: checkIdNum, trigger: "blur"},
        ],
      },
      //境内第三方
      rulesCIn: {
        authorization_relation: [
          {required: true, message: this.validMsg("bank.authorization_relation"), trigger: "blur"},
          {validator: checkInlandName, trigger: "blur"},
        ],
        authorize_photo: [{required: true, validator: validateUpload, trigger: "change"}],
      },
      //境外第三方
      rulesCOut: {
        authorization_relation: [{
          required: true,
          message: this.validMsg("bank.authorization_relation"),
          trigger: "blur"
        }],
        authorize_photo: [{required: true, validator: validateUpload, trigger: "change"}],
      },
      //境外个人
      rulesD: {
        bank_address: [{required: true, message: this.validMsg("bank.bank_address"), trigger: "blur"}],
        name: [{required: true, message: this.validMsg("bank.name"), trigger: "blur"}],
        bank_card_mobile: [
          {required: true, message: this.validMsg("bank.bank_card_mobile"), trigger: "blur"},
          {validator: checkNum, trigger: "blur"},
        ],
        card_identity_number: [{required: true, message: this.validMsg("bank.card_identity_number"), trigger: "blur"}],
        select_country: [{required: true, message: this.validMsg("bank.bank_country2"), trigger: "change"}],
        inter_bank_no: [{required: true, message: this.validMsg("bank.inter_bank_no"), trigger: "blur"}],
        bank_name: [{required: true, message: this.validMsg("bank.bank_name"), trigger: "blur"}],
        bank_branch: [{required: true, message: this.validMsg("bank.bank_branch"), trigger: "blur"}],
      },
      //境外企业
      rulesE: {
        card_country_type: [{required: true, message: this.validMsg("comm.type"), trigger: "blur"}],
        payee_type: [{required: true, message: this.validMsg("bank.payee_type"), trigger: "blur"}],
        card_account_type: [{required: true, message: this.validMsg("bank.payee_account_type"), trigger: "blur"}],
        name: [{required: true, message: this.validMsg("bank.name"), trigger: "blur"}],
        bank_name: [{required: true, message: this.validMsg("bank.bank_name2"), trigger: "blur"}],
        card_no: [{required: true, message: this.validMsg("bank.card_no2"), trigger: "blur"}],
        select_country: [{required: true, message: this.validMsg("bank.bank_country"), trigger: "change"}],
        bank_address: [{required: true, message: this.validMsg("bank.bank_address2"), trigger: "blur"}],

        card_company_register_address: [{
          required: true,
          message: this.validMsg("user.company_register_address"),
          trigger: "blur"
        }],
        route_mode: [{required: true, message: this.validMsg("bank.route_mode"), trigger: "blur"}],
        bank_swift_no: [{required: true, message: this.validMsg("bank.bank_swift_no"), trigger: "blur"}],
        bank_card_mobile: [{required: true, message: this.validMsg("bank.bank_card_mobile"), trigger: "blur"}],
      },
      //境内
      rulesF: {
        select_province: [{required: true, message: this.validMsg("bank.bank_country2"), trigger: "change"}],
        bank_card_mobile: [
          {required: true, message: this.validMsg("bank.bank_card_mobile"), trigger: "blur"},
          {validator: checkInlandPhone, trigger: "blur"},
        ],
        inter_bank_no: [
          {required: true, message: this.validMsg("bank.inter_bank_no"), trigger: "blur"},
          {validator: checkInlandInterBankNo, trigger: "blur"},
        ],
        bank_name: [
          {required: true, message: this.validMsg("bank.bank_name"), trigger: "blur"},
          {validator: checkNameFourTwenty, trigger: "blur"},
        ],
        bank_branch: [
          {required: true, message: this.validMsg("bank.bank_branch"), trigger: "blur"},
          {validator: checkNameFourTwenty, trigger: "blur"},
        ],
      },
      //境外第三方企业
      rulesOTC: {},
      //境外第三方个人
      rulesOTP: {},
      //境外自己企业
      rulesOOC: {},
      //境外自己个人
      rulesOOP: {},
      //境内第三方企业
      rulesITC: {
        name: [
          {required: true, message: this.validMsg("bank.name"), trigger: "blur"},
          {validator: checkInlandName, trigger: "blur"},
        ],
      },
      //境内第三方个人
      rulesITP: {
        name: [
          {required: true, message: this.validMsg("bank.name"), trigger: "blur"},
          {validator: checkInlandName, trigger: "blur"},
        ],
      },
      //境内自己个人
      rulesIOP: {
        name: [{required: true, message: this.validMsg("bank.name"), trigger: "blur"}],
      },
      //境内自己企业
      rulesIOC: {
        name: [{required: true, message: this.validMsg("bank.name"), trigger: "blur"}],
      },

      //
      ecmRuleData: [],
      paymentMethodFees: [],
      companyAuthorizationTemplate: configs.template.settleBasePath + "%E4%B8%9A%E5%8A%A1%E6%AC%BE%E6%8C%87%E7%A4%BA%E4%BA%A4%E4%BB%98%E9%80%9A%E7%9F%A5%E4%B9%A6V1.1.pdf",
      outCompanyAuthorizationTemplate: configs.template.settleBasePath + "Settlement%20Authorization%20Letter.pdf",
      upload_flag: false,
      update_box_show: true,
      sizeType: "sm-box-up",
      cssType: "",
      payeeTypeList: [
        {value: "own_company", text: "bank.own_company_account"},
        {value: "third", text: "bank.third_account_inland"},
      ],
      payeePersonalTypeList: [
        {value: "own", text: "bank.own_personal_account"},
        // { value: "third", text: "bank.third_account" },
      ],
      payeeInlandCompanyTypeList: [
        {value: "own_company", text: "bank.own_company_account"},
        {value: "third", text: "bank.third_account_inland"},
      ],
      payeeOutlandCompanyTypeList: [
        {value: "own_company", text: "bank.own_company_account"},
        {value: "third", text: "bank.third_account_outland"},
      ],
      accountTypeList: [{value: "company", text: "user.company", disabled: false}],
      accountPersonalTypeList: [{value: "personal", text: "user.personal", disabled: false}],
      accountCompanyTypeList: [{value: "company", text: "user.company", disabled: false}],
      ///api key
      apikeyLoading: false,
      apikeySearch: {'key': ''},
      apiKeyData: [],
      createApiKeyForm: {'name': ''},
      createApiKeyDialogVisible: false,
      keyLogSearch: {'key': '', 'page': 1},
      keyLogLoading: false,
      keyLogData: {list: [], page: {count: 0, page_num: 0, total: 0}},
      logDrawer: false,
      keyLogDetailVisible: false,
      logDetailItem: {},
    };
  },
  mounted() {
    this.loadMerInfo();
    if (this.user.is_master) {
      this.loadApiKeyList();
    }
  },
  methods: {
    delApiKey(row) {
      this.apikeyLoading = true
      deleteApiKey({'key': row.api_key}).then(res => {
        this.$message.success(res.message)
        this.loadApiKeyList()
      }).finally(() => {
        this.apikeyLoading = false
      })
    },
    showCreateApiKey() {
      this.createApiKeyDialogVisible = true
    },
    createNewApiKey() {
      this.apikeyLoading = true
      createApiKey(this.createApiKeyForm).then(res => {
        this.$message.success(res.message)
        this.loadApiKeyList()
        this.$data.createApiKeyDialogVisible = false
      }).finally(() => {
        this.apikeyLoading = false
      })
    },
    loadApiKeyList() {
      this.apikeyLoading = true
      getApiKeyList(this.apikeySearch).then(res => {
        const {data} = res
        this.$data.apiKeyData = data
      }).finally(() => {
        this.apikeyLoading = false
      })
    },
    viewKeyLogDetail(row){
      this.keyLogDetailVisible = true
      this.logDetailItem = row
    },
    viewKeyLogs(key) {
      this.logDrawer = true
      this.keyLogSearch.key = key
      this.searchKeyLogs();
    },
    logsPageChange(page) {
      this.searchKeyLogs(page.page_num)
    },
    searchKeyLogs(pageNum) {
      this.keyLogLoading = true
      if (pageNum === undefined || isEmpty(pageNum)) {
        pageNum = 1
      } else if (!isEmpty(pageNum) && pageNum === 'keep') {
        //keep 可能只是重载数据页面
        pageNum = this.keyLogSearch.page
      }
      this.keyLogSearch.page = pageNum
      keyLogs(this.keyLogSearch).then(res => {
        const {data} = res
        this.$data.keyLogData = data
      }).finally(() => {
        this.keyLogLoading = false
      })
    },
    ecmMatchClass(row) {
      if (!isEmpty(row) && !isEmpty(row.row.amount) && row.row.amount === this.info.chargeback_fees) {
        return "ecm-current-row";
      }
      return "";
    },
    loadMerInfo() {
      this.loading = true;
      getMerInfo()
          .then(res => {
            const {data} = res;
            this.$data.info = data.info;
            this.$data.other_info = data.other_info;
            if (!isEmpty(data.bank)) {
              this.$data.add_bank = data.bank;
            }
            this.$data.ecmRuleData = data.ecm_rule;
            this.$data.paymentMethodFees = data.payment_method_fees;

            if (this.add_bank.status !== 1) {
              this.loadIdentity();
            }
          })
          .finally(() => {
            this.loading = false;
          });
    },
    loadIdentity() {
      this.loading = true;
      getMerIdentity()
          .then(res => {
            const {data} = res;
            let detailData = data.detail;
            detailData.card_country_type = "inland"; // 初始值
            detailData.card_account_type = "company"; //初始值
            this.$data.detail = detailData;
            this.$data.add_bank.payee_type = "own_company";
            this.$data.add_bank.route_mode = "SWIFT";
            if (!isEmpty(this.$data.info.card_country_type)) {
              //type数据在info
              if (this.$data.info.card_country_type === "outland") {
                this.$data.detail.card_country_type = "outland";
                this.$data.add_bank.card_country_type = "outland";
                this.inland_disabled = true;
                this.outland_disabled = false;
              } else {
                this.$data.detail.card_country_type = "inland";
                this.$data.add_bank.card_country_type = "inland";
                this.inland_disabled = false;
                this.outland_disabled = true;
              }
            } else {
              if (!isEmpty(this.$data.info.identity_country_type)) {
                if (this.$data.info.identity_country_type === "outland") {
                  this.$data.detail.card_country_type = "outland";
                  this.$data.add_bank.card_country_type = "outland";
                  this.inland_disabled = true;
                  this.outland_disabled = false;
                } else {
                  this.$data.detail.card_country_type = "inland";
                  this.$data.add_bank.card_country_type = "inland";
                  this.inland_disabled = false;
                  this.outland_disabled = true;
                }
              } else {
                this.$data.detail.card_country_type = "inland";
                this.$data.add_bank.card_country_type = "inland";
                this.inland_disabled = false;
                this.outland_disabled = true;
              }
            }
            if (!isEmpty(this.$data.info.card_account_type)) {
              //type数据在info
              if (this.$data.info.card_account_type === "company") {
                this.$data.detail.card_account_type = "company";
                this.$data.add_bank.card_account_type = "company";
                if (this.$data.add_bank.card_country_type === "outland") {
                  this.payeeTypeList = this.payeeOutlandCompanyTypeList;
                } else {
                  this.payeeTypeList = this.payeeInlandCompanyTypeList;
                }
              } else {
                this.$data.detail.card_account_type = "personal";
                this.$data.add_bank.card_account_type = "personal";
                this.$data.add_bank.payee_type = "own";
                this.payeeTypeList = this.payeePersonalTypeList;
              }
            } else {
              if (!isEmpty(this.$data.info.identity_account_type)) {
                if (this.$data.info.identity_account_type === "company") {
                  this.$data.detail.card_account_type = "company";
                  this.$data.add_bank.card_account_type = "company";
                  if (this.$data.add_bank.card_country_type === "outland") {
                    this.payeeTypeList = this.payeeOutlandCompanyTypeList;
                  } else {
                    this.payeeTypeList = this.payeeInlandCompanyTypeList;
                  }
                } else {
                  this.$data.detail.card_account_type = "personal";
                  this.$data.add_bank.card_account_type = "personal";
                  this.$data.add_bank.payee_type = "own";
                  this.payeeTypeList = this.payeePersonalTypeList;
                }
              }
            }

            this.typeChange();
          })
          .finally(() => {
            this.loading = false;
          });
    },
    addBankBtn() {
      // 更新状态
      this.$store.dispatch("user/loadUserInfo").then(() => {
        if (this.user.identity_status !== 1) {
          this.$alert(this.$i18n.t("account.need_valid_identity_before").toString(), "", {
            confirmButtonText: this.$i18n.t("comm.sure").toString(),
          });
        } else {
          this.openBankDialog("add", null);
        }
      });
    },
    handleInlandCountryChange(value) {
      if (isEmpty(value)) {
        this.add_bank.select_province = null;
      } else {
        this.add_bank.bank_state = value[0];
        this.add_bank.bank_city = value[1];
      }
    },
    getProvinceJson() {
      if (isEmpty(this.inland_area_all_list) || this.inland_area_all_list.length <= 0) {
        this.$data.loading = true;
        getInlandAreaJsonData()
            .then(res => {
              const {data} = res;
              this.$data.inland_area_all_list = data;
            })
            .finally(() => {
              this.$data.loading = false;
            });
      }
    },
    selectCountry(val) {
      let allState = {
        id: 0,
        name: "All",
        state_code: "all",
      };
      this.add_bank.bank_country = val.iso2;
      this.select_state = null;
      if (isEmpty(val)) {
        this.area_states_list = [];
        this.add_bank.bank_state = "";
      } else {
        if (isEmpty(val.states) || val.states.length <= 0) {
          this.area_states_list = [allState];
          this.select_state = allState;
          this.add_bank.bank_state = allState.state_code;
        } else {
          this.area_states_list = val.states;
        }
      }
    },
    selectState(val) {
      this.add_bank.bank_state = val.state_code;
    },
    getCountryJson() {
      if (isEmpty(this.area_all_list) || this.area_all_list.length <= 0) {
        this.$data.loading = true;
        getAreaJsonData()
            .then(res => {
              const {data} = res;
              this.$data.area_all_list = data;
            })
            .finally(() => {
              this.$data.loading = false;
            });
      }
    },
    openBankDialog(action) {
      if (isEmpty(this.add_bank) || isEmpty(this.add_bank.status)) {
        this.initBankForm();
        this.loadMerInfo();
      } else {
        this.typeChange();
      }

      this.add_bank.action = action;
      this.addBankDialogVisible = true;
    },
    typeChange() {
      if (!isEmpty(this.add_bank) && !isEmpty(this.add_bank.card_country_type) && !isEmpty(this.add_bank.payee_type) && !isEmpty(this.add_bank.card_account_type)) {
        if (this.add_bank.card_country_type === "outland") {
          this.getCountryJson();
          if (this.add_bank.payee_type === "third") {
            //third
            this.updateThirdAccountType();
            this.disable_name = false;
            if (this.add_bank.card_account_type === "company") {
              if (!isEmpty(this.detail.company_name)) {
                this.$set(this.add_bank, "name", this.detail.company_name);
              }
              this.payeeTypeList = this.payeeOutlandCompanyTypeList;
              this.rules = Object.assign(this.rulesOTC, this.rulesE, this.rulesCOut);
            } else {
              if (!isEmpty(this.detail.identity_name)) {
                this.$set(this.add_bank, "name", this.detail.identity_name);
              }
              this.rules = Object.assign(this.rulesOTP, this.rulesD, this.rulesCOut, this.rulesA);
            }
          } else {
            //own
            this.updateOwnAccountType();
            this.disable_name = true;
            if (this.add_bank.card_account_type === "company") {
              if (isEmpty(this.detail.company_name)) {
                this.disable_name = false;
              } else {
                this.$set(this.add_bank, "name", this.detail.company_name);
              }
              this.payeeTypeList = this.payeeOutlandCompanyTypeList;
              this.rules = Object.assign(this.rulesOOC, this.rulesE);
            } else {
              if (isEmpty(this.detail.identity_name)) {
                this.disable_name = false;
              } else {
                this.$set(this.add_bank, "name", this.detail.identity_name);
              }
              this.rules = Object.assign(this.rulesOOP, this.rulesD, this.rulesA);
            }
          }
        } else {
          // 境内
          this.getProvinceJson();
          if (this.add_bank.payee_type === "third") {
            //third
            this.updateThirdAccountType();
            this.disable_name = false;
            if (this.add_bank.card_account_type === "company") {
              if (!isEmpty(this.detail.company_name)) {
                this.$set(this.add_bank, "name", this.detail.company_name);
              }
              this.payeeTypeList = this.payeeInlandCompanyTypeList;
              this.rules = Object.assign(this.rulesITC, this.rulesF, this.rulesCIn, this.rulesA);
            } else {
              if (!isEmpty(this.detail.identity_name)) {
                this.$set(this.add_bank, "name", this.detail.identity_name);
              }
              this.rules = Object.assign(this.rulesITP, this.rulesF, this.rulesB, this.rulesCIn, this.rulesA);
            }
          } else {
            //own
            this.updateOwnAccountType();
            this.disable_name = true;
            if (this.add_bank.card_account_type === "company") {
              if (isEmpty(this.detail.company_name)) {
                this.disable_name = false;
              } else {
                this.$set(this.add_bank, "name", this.detail.company_name);
              }
              this.payeeTypeList = this.payeeInlandCompanyTypeList;
              this.rules = Object.assign(this.rulesIOC, this.rulesF, this.rulesA);
            } else {
              if (isEmpty(this.detail.identity_name)) {
                this.disable_name = false;
              } else {
                this.$set(this.add_bank, "name", this.detail.identity_name);
              }
              this.rules = Object.assign(this.rulesIOP, this.rulesF, this.rulesB, this.rulesA);
            }
          }
        }
      } else {
        this.rules = this.rulesA;
      }
    },
    updateThirdAccountType() {
      this.accountTypeList = this.accountPersonalTypeList;
      if (this.detail.card_account_type === "company") {
        this.add_bank.card_account_type = "personal";
      }
    },
    updateOwnAccountType() {
      if (this.detail.card_account_type === "company") {
        this.accountTypeList = this.accountCompanyTypeList;
        this.add_bank.card_account_type = "company";
      } else {
        this.accountTypeList = this.accountPersonalTypeList;
        this.add_bank.card_account_type = "personal";
      }
    },
    updateAuthorizePhoto(v) {
      this.add_bank.authorize_photo = v;
    },
    initBankFormObj() {
      return {
        mid_type: "",
        action: "",
        name: "",
        bank_name: "",
        bank_address: "",
        bank_branch: "",
        card_no: "",
        inter_bank_no: "",
        bank_card_mobile: "",
        card_identity_number: "",
        authorize_photo: "",
        authorization_relation: "",
        card_country_type: "inland",
        payee_type: "own_company",
        card_account_type: "company",
        bank_country: "",
        card_company_register_address: "",
        route_mode: "SWIFT",
        bank_swift_no: "",
        bank_state: "",
        bank_city: "",
      };
    },
    initBankForm() {
      this.add_bank = this.initBankFormObj();
    },
    closeBankDialog() {
      this.addBankDialogVisible = false;
      this.select_state = null;
      this.$refs.add_bank.resetFields(); //重置
    },
    submitAddBank() {
      this.$refs["add_bank"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          //
          // if (!isEmpty(this.add_bank.authorization_relation) && isEmpty(this.add_bank.authorize_photo)) {
          //     this.$message.error(this.$i18n.t("valid.uploaded_field", [this.$i18n.t("bank.authorize_photo")]));
          // } else {
          if (this.add_bank.action === "add") {
            //暂时不得修改，只能人工修改
            this.$data.loading = true;
            let formData = new FormData();
            let params = this.add_bank;
            Object.keys(params).forEach(key => {
              //把json转成FormData
              formData.append(key, params[key]);
            });
            addBank(formData)
                .then(() => {
                  this.$message.success(this.$i18n.t("comm.success").toString());
                  if (this.add_bank.payee_type === "third") {
                    this.$confirm(this.$i18n.t("bank.upload_authorize_success_tip").toString(), "", {
                      confirmButtonText: this.$i18n.t("comm.sure").toString(),
                      type: "warning",
                      showCancelButton: false,
                      showClose: false,
                      closeOnClickModal: false,
                      closeOnPressEscape: false,
                    })
                        .then(() => {
                          this.loadMerInfo();
                          this.closeBankDialog();
                        })
                        .catch(() => {
                        });
                  } else {
                    this.loadMerInfo();
                    this.closeBankDialog();
                  }
                })
                .finally(() => {
                  this.$data.loading = false;
                });
          }
          // }
        }
      });
    },
    //-------
    changeImgFile(e, fileList) {
      const isLt500K = e.raw.size / 1024 < 500;
      if (isLt500K) {
        this.add_bank.authorize_photo = e.raw;
        this.update_box_show = false; //只给上传一张
        this.upload_flag = true;
        this.$refs.add_bank.validateField(["authorize_photo"], formError => {
          if (formError) {
            return false;
          }
        });
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
      this.add_bank.authorize_photo = "";
      this.upload_flag = false;
      this.$refs.add_bank.validateField(["authorize_photo"], formError => {
        if (formError) {
          return false;
        }
      });
    },
    validMsg(name) {
      return this.$i18n.t("valid.required_field", [this.$i18n.t(name)]);
    },
    validMsg2(name) {
      return this.$i18n.t("valid.uploaded_field", [this.$i18n.t(name)]);
    },
    validReg(reg, value, field, callback) {
      if (!reg.test(value)) {
        return callback(this.$i18n.t("bank." + field) + this.$i18n.t("user.incorrect_format"));
      } else {
        callback();
      }
    },
    ecmRateText(rate) {
      return (rate * 100) + '%';//显示2位小数点 (暂时弃用)
    },
    ecmRateHtml(rate) {
      if (!isEmpty(rate)) {
        let rateNum = math.multiply(rate, 100)
        if (rateNum > 1) {
          if (rateNum.toString().indexOf('.') !== -1) {
            return '<span class="ecm-rate-a">' + rateNum.toString().substring(0, rateNum.toString().indexOf('.')) + '</span>'
                + '<span class="ecm-rate-b">' + rateNum.toString().substring(rateNum.toString().indexOf('.')) + '%</span>';
          } else {
            return '<span class="ecm-rate-a">' + rateNum + '</span>%';
          }
        } else {
          return rateNum + '%';//显示所有小数点
        }
      }
      return '';
    }
  },
};
</script>

<style scoped>
.ecm-list-table tr {
  border: 0;
}

.ecm-list-table::before {
  display: none;
}

.ecm-list-table td {
  border: 0;
  padding: 2px 0;
  font-size: 13px;
}

.ecm-list-table .ecm-current-row {
  font-weight: bold;
  font-size: 15px;
}

.api-feature-soon {
  position: relative;
}

.api-feature-soon table {
  opacity: 0.3;
  color: #666;
}

::v-deep .el-upload-dragger {
  width: 150px;
  height: 150px;
}

::v-deep .el-upload-dragger .el-icon-upload {
  line-height: 30px;
  margin-top: 20px;
}

.top_tip {
  margin-top: 8px;
}

.el-upload__tip {
  line-height: 12px;
  word-break: break-word;
}

.el-upload__tip1 {
  margin-top: 0;
}

::v-deep .el-upload-dragger .el-upload__text {
  margin-top: 10px;
  word-break: keep-all;
}

::v-deep .el-form-item--medium .el-form-item__label {
  line-height: 1;
  padding-top: 8px;
  word-break: keep-all;
}

::v-deep .el-form-item--medium .el-form-item__content {
  line-height: 1;
}

::v-deep .hide-box .el-upload-dragger {
  display: none;
}
</style>
