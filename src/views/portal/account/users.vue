<template>
    <div v-loading="loading">
        <div class="wrap-tab p-0">
            <el-card class="box-card" shadow="hover" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <strong>{{$t('user.user_role')}}</strong>
                    <small style="padding-left: 10px; color: gray">{{$t('user.user_role_limit')}}</small>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="addRoleBtn">{{$t('user.add_role')}}</el-button>
                </div>
                <el-table
                        stripe
                        :expand-row-keys="expandKeys"
                        :class="tabRoleData.page.total ? '' : 'wpy-z-table'"
                        :data="tabRoleData.list"
                        :header-row-style="{background:'#2C2E2F'}"
                        row-key="role_uid"
                        style="width: 100%">
                    <el-table-column
                            prop="role_name"
                            :label="$t('user.role_name')">
                        <template v-slot="scope">
                            <strong>{{scope.row.role_name}}</strong>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand" prop="role_menu"
                                     width="100px"
                                     min-width="100px"
                                     :label="$t('user.role_menu')">
                        <template slot-scope="props">
                            <el-tag
                                    v-for="item in props.row.menus"
                                    :key="item.name"
                                    type="info"
                                    class="mr-2 mb-1"
                                    effect="plain">
                                {{ $t('nav.' + item.name) }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            width="80px"
                            :label="$t('comm.status')">
                        <template v-slot="scope">
                            {{scope.row.status | numberStatus }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="remark"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.remark')">
                    </el-table-column>
                    <el-table-column
                            prop="created"
                            :label="$t('comm.created')">
                        <template v-slot="scope">
                            {{scope.row.created | toDay }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="updated"
                            :label="$t('comm.updated')">
                        <template v-slot="scope">
                            {{scope.row.updated | toDay }}
                        </template>
                    </el-table-column>
                    <el-table-column width="50" >
                        <template v-slot="scope">
                            <el-dropdown
                                    trigger="click" @command="handleCommand">
                                      <span class="el-dropdown-link">
                                          <i class="el-icon-more"></i>
                                      </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="commandVal('editRole', scope.row, scope.$index)">
                                        <i class="el-icon-edit"></i> {{$t('comm.edit')}}
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="commandVal('userSite', scope.row, scope.$index)">
                                        <i class="el-icon-view"></i> 分配网站权限
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="commandVal('deleteRole', scope.row, scope.$index)">
                                      <i class="el-icon-delete"></i> {{$t('comm.del')}}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination :page="tabRoleData.page" @change="pageRoleChange"></Pagination>
            </el-card>
            <el-divider></el-divider>
            <el-card class="box-card" shadow="hover" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <strong>{{$t('user.mer_user')}}</strong>
                    <small  style="padding-left: 10px; color: gray">{{$t('user.mer_user_limit')}}</small>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="addUserBtn">{{$t('user.add_user')}}</el-button>
                </div>
                <el-table stripe
                          :class="tabUserData.page.total ? '' : 'wpy-z-table'"
                          :data="tabUserData.list"
                          :header-row-style="{background:'#2C2E2F'}"
                          style="width: 100%">
                    <el-table-column
                            prop="username"
                            :label="$t('user.username')">
                        <template v-slot="scope">
                            <strong>{{scope.row.username}}</strong>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            min-width="100px"
                            :label="$t('comm.email')">
                    </el-table-column>
                    <el-table-column
                            prop="full_name"
                            :label="$t('user.full_name')">
                    </el-table-column>
                    <el-table-column
                            prop="role_name"
                            :label="$t('user.user_role')">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.phone')">
                        <template v-slot="scope">
                            {{scope.row.phone | nullToLine }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            :label="$t('comm.status')">
                        <template v-slot="scope">
                            {{scope.row.status | numberStatus }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="email_status"
                            :label="$t('comm.email_status')">
                        <template v-slot="scope">
                            {{scope.row.email_status | validStatus }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="created"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.created')">
                        <template v-slot="scope">
                            {{scope.row.created | toDay }}
                        </template>
                    </el-table-column>
                    <el-table-column width="50" fixed="right">
                        <template v-slot="scope">
                            <el-dropdown
                                    trigger="click" @command="handleCommand">
                                      <span class="el-dropdown-link">
                                          <i class="el-icon-more"></i>
                                      </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="commandVal('editUser', scope.row, scope.$index)">
                                        <i class="el-icon-edit"></i> {{$t('comm.edit')}}
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="commandVal('disableUser', scope.row, scope.$index)">
                                        <i class="el-icon-turn-off"></i> {{$t('comm.disable')}}
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="commandVal('enableUser', scope.row, scope.$index)">
                                        <i class="el-icon-open"></i> {{$t('comm.enable')}}
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="commandVal('deleteUser', scope.row, scope.$index)">
                                      <i class="el-icon-delete"></i> {{$t('comm.del')}}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination :page="tabUserData.page" @change="pageUserChange"></Pagination>
            </el-card>
        </div>
        <!--    d    -->
        <el-dialog custom-class="wpy-dialog bg-dialog bg-body"
                   @close="closeRoleDialog"
                   :show-close="false" :close-on-click-modal="false"
                   :title="$t('user.role_name')"
                   top="15px"
                   :visible.sync="addRoleDialogVisible">
            <div>
                <el-form ref="add_role"
                         :model="add_role"
                         :rules="rules" label-width="100px" class="p-1 pt-3 pb-0">
                    <el-form-item :label="$t('user.role_name')" prop="role_name">
                        <el-input v-model="add_role.role_name"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.role_menu')" prop="role_perm" v-if="perm_list">
                        <el-checkbox-group v-model="add_role.role_perm" size="mini">
                            <div v-for="perm in perm_list" :key="perm.name">
                                <el-checkbox :label="perm.name"
                                             :disabled="perm.name === 'home' || perm.name === 'message_center' || perm.name === 'app_home' "
                                             name="role_perm" size="mini">
                                    {{ $t('nav.' + perm.name) }}
                                </el-checkbox>
                                <div class="pl-3">
                                    <el-checkbox v-for="item in perm.children" :key="item.name"
                                                 :label="item.name" size="mini">
                                        {{ $t('nav.' + item.name) }}
                                    </el-checkbox>
                                </div>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item :label="$t('comm.remark')" prop="remark">
                        <el-input v-model="add_role.remark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer" v-loading="loading">
                <el-button size="mini" @click="closeRoleDialog()">{{$t('comm.cancel')}}</el-button>
                <el-button size="mini" type="primary" @click="submitAddRole">{{$t('comm.confirm_submit')}}</el-button>
            </div>
        </el-dialog>
        <el-dialog custom-class="wpy-dialog sm-dialog"
                   @close="closeUserDialog"
                   :show-close="false" :close-on-click-modal="false"
                   :title="$t('nav.merchant_users')"
                   :visible.sync="addUserDialogVisible">
            <div>
                <el-form ref="add_user"
                         :model="add_user"
                         :rules="rules" label-width="100px">
                    <el-form-item :label="$t('user.username')" prop="username">
                        <el-input v-model="add_user.username" :disabled="add_user.action === 'edit'"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('comm.email')" prop="email">
                        <el-input v-model="add_user.email" :disabled="add_user.action === 'edit'"></el-input>
                        <p v-show="add_user.action === 'add'" class="text-muted p-0 m-0"><strong>*{{$t('account.pwd_will_send_this_email')}}</strong></p>
                    </el-form-item>
                    <el-form-item :label="$t('user.user_role')" prop="role_uid">
                        <el-select v-model="add_user.role_uid" :placeholder="$t('user.user_role')"
                                   filterable>
                            <el-option
                                    v-for="item in role_list"
                                    :key="item.role_uid"
                                    :label="item.role_name"
                                    :value="item.role_uid">
                                <span style="float: left">{{ item.role_name }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('comm.phone')" prop="phone">
                        <el-input v-model="add_user.phone"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.full_name')" prop="full_name">
                        <el-input v-model="add_user.full_name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer" v-loading="loading">
                <el-button size="mini" @click="closeUserDialog()">{{$t('comm.cancel')}}</el-button>
                <el-button size="mini" type="primary" @click="submitAddUser">{{$t('comm.confirm_submit')}}</el-button>
            </div>
        </el-dialog>
        <UserSiteDialog ref="user_site_dialog"></UserSiteDialog>

    </div>
</template>

<script>
    import configs from '@/configs'
    import Pagination from "@/components/Pagination";
    import UserSiteDialog from "@/components/UserSiteDialog";
    import {isArray, isEmpty} from "@/utils/validate";
    import {
        addRole,
        addUser,
        disableUser, enableUser,
        getAllMenus,
        roleSearch,
        updateRole,
        updateUser,
        userSearch,
        deleteRole,
        deleteUser
    } from "@/service/merchantSer";

    export default {
        name: "merchant_users",
        components: {Pagination, UserSiteDialog},
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                searchParams: {
                    title: 'nav.merchant_user', page: 1,
                },
                searchUserParams: {
                    title: 'nav.merchant_user', page: 1,
                },
                tabRoleData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                add_role: this.initRoleFormObj(),
                addRoleDialogVisible: false,
                perm_list: null,
                tabUserData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                add_user: this.initUserFormObj(),
                addUserDialogVisible: false,
                role_list: [],

                rules: {
                    role_name: [
                        {required: true, message: this.validMsg('user.role_name'), trigger: 'blur'},
                    ],
                    role_perm: [
                        {type: 'array', required: true, message: this.validMsg('user.role_name'), trigger: 'blur'}
                    ],
                    role_uid: [
                        {required: true, message: this.validMsg('user.user_role'), trigger: 'blur'},
                    ],
                    username: [
                        {required: true, message: this.validMsg('user.username'), trigger: 'blur'},
                        {min: 4, max: 20, message: this.$i18n.t('valid.bad.length_4_20'), trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: this.validMsg('user.email'), trigger: 'blur'},
                    ],
                },

                expandKeys: [],
            }
        },
        mounted() {
            this.roleSearch();
            this.userSearch();
        },
        methods: {
            validMsg(name) {
                return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
            },
            pageUserChange(page) {
                this.searchUserParams.page = page.page_num
                this.userSearch()

            },
            pageRoleChange(page) {
                this.searchParams.page = page.page_num
                this.roleSearch()
            },
            roleSearch() {
                this.loading = true
                roleSearch(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabRoleData = data
                    if (!isEmpty(data.list)) this.expandKeys = [data.list[0].role_uid] //显示第一个
                }).finally(() => {
                    this.loading = false
                })
            },
            userSearch() {
                this.loading = true
                userSearch(this.searchUserParams).then(res => {
                    const {data} = res
                    this.$data.tabUserData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            commandVal(action, row, index) {
                return {action: action, row: row, index: index}
            },
            openUserSiteDialog(row) {
                this.$refs.user_site_dialog.show(row)
            },
            handleCommand(command) {
                let row = command.row
                switch (command.action) {
                    case 'editRole':
                        this.openRoleDialog('edit', row)
                        break;
                    case 'userSite':
                        this.openUserSiteDialog(row)
                        break;
                    case 'editUser':
                        this.openUserDialog('edit', row)
                        break;
                    case 'disableUser':
                        this.loading = true
                        disableUser(row).then(() => {
                            this.$message.success(this.$i18n.t('comm.success').toString())
                            this.userSearch()
                        }).finally(() => {
                            this.loading = false
                        })
                        break;
                    case 'enableUser':
                        this.loading = true
                        enableUser(row).then(() => {
                            this.$message.success(this.$i18n.t('comm.success').toString())
                            this.userSearch()
                        }).finally(() => {
                            this.loading = false
                        })
                        break;
                    case 'deleteRole':
                        this.loading = true
                        deleteRole(row).then(() => {
                          this.$message.success(this.$i18n.t('comm.success').toString())
                          this.roleSearch()
                        }).finally(() => {
                          this.loading = false
                        })
                        break;
                    case 'deleteUser':
                        this.loading = true
                        deleteUser(row).then(() => {
                          this.$message.success(this.$i18n.t('comm.success').toString())
                          this.userSearch()
                        }).finally(() => {
                          this.loading = false
                        })
                        break;
                }
            },
            //---role
            addRoleBtn() {
                this.openRoleDialog('add', null)
            },
            openRoleDialog(action, item) {
                if (isEmpty(this.perm_list)) {
                    this.$data.loading = true
                    getAllMenus().then(res => {
                        const {data} = res
                        this.$data.perm_list = data.menus
                        this.renderRoleDialog(action, item)
                    }).finally(() => {
                        this.$data.loading = false
                    })
                } else {
                    this.renderRoleDialog(action, item)
                }
            },
            renderRoleDialog(action, data) {
                this.initRoleForm()
                if (!isEmpty(data)) {
                    this.add_role.role_uid = data.role_uid
                    this.add_role.role_name = data.role_name
                    this.add_role.role_perm = []
                    if (!isEmpty(data.menus) && isArray(data.menus) && data.menus.length > 0) {
                        data.menus.forEach(val => {
                            this.add_role.role_perm.push(val.name)
                        });
                    }
                    this.add_role.remark = data.remark
                }
                this.add_role.role_perm.push('home')
                this.add_role.role_perm.push('message_center')
                this.add_role.role_perm.push('app_home')
                this.add_role.action = action
                this.addRoleDialogVisible = true
            },
            initRoleFormObj() {
                return {action: '', role_uid: '', role_name: '', role_perm: [], remark: ''}
            },
            initRoleForm() {
                this.add_role = this.initRoleFormObj()
            },
            closeRoleDialog() {
                this.addRoleDialogVisible = false
                this.$refs.add_role.resetFields();//重置
            },
            submitAddRole() {
                this.$refs['add_role'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        //
                        if (!isEmpty(this.add_role.role_perm)) {
                            this.add_role.perms = JSON.stringify(this.add_role.role_perm)
                        } else {
                            this.add_role.perms = ''
                        }
                        if (this.add_role.action === 'add') {
                            this.$data.loading = true
                            addRole(this.add_role).then(() => {
                                this.$message.success(this.$i18n.t('comm.success').toString())
                                this.closeRoleDialog()
                                this.roleSearch()
                            }).finally(() => {
                                this.$data.loading = false
                            })
                        } else if (this.add_role.action === 'edit') {
                            this.$data.loading = true
                            updateRole(this.add_role).then(() => {
                                this.$message.success(this.$i18n.t('comm.success').toString())
                                this.closeRoleDialog()
                                this.roleSearch()
                            }).finally(() => {
                                this.$data.loading = false
                            })
                        }
                    }
                });
            },
            //-------
            addUserBtn() {
                this.openUserDialog('add', null)
            },
            openUserDialog(action, item) {
                this.$data.loading = true
                roleSearch({}).then(res => { //先加载组数据
                    const {data} = res
                    this.$data.role_list = data.role_list
                    this.renderUserDialog(action, item)
                }).finally(() => {
                    this.$data.loading = false
                })
            },
            renderUserDialog(action, data) {
                this.initUserForm()
                if (!isEmpty(data)) {
                    this.add_user.mer_uid = data.mer_uid
                    this.add_user.username = data.username
                    this.add_user.email = data.email
                    this.add_user.phone = data.phone
                    this.add_user.full_name = data.full_name
                    this.add_user.role_uid = data.role_uid
                }
                this.add_user.action = action
                this.addUserDialogVisible = true
            },
            initUserFormObj() {
                return {action: '', mer_uid: '', username: '', email: '', role_uid: '', phone: '', full_name: ''}
            },
            initUserForm() {
                this.add_user = this.initUserFormObj()
            },
            closeUserDialog() {
                this.addUserDialogVisible = false
                this.$refs.add_user.resetFields();//重置
            },
            submitAddUser() {
                this.$refs['add_user'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        //
                        if (this.add_user.action === 'add') {
                            this.$data.loading = true
                            addUser(this.add_user).then(() => {
                                this.$message.success(this.$i18n.t('comm.success').toString())
                                this.closeUserDialog()
                                this.userSearch()
                            }).finally(() => {
                                this.$data.loading = false
                            })
                        } else if (this.add_user.action === 'edit') {
                            this.$data.loading = true
                            updateUser(this.add_user).then(() => {
                                this.$message.success(this.$i18n.t('comm.success').toString())
                                this.closeUserDialog()
                                this.userSearch()
                            }).finally(() => {
                                this.$data.loading = false
                            })
                        }
                    }
                });
            },
            //-

        },
    }
</script>

<style scoped>

</style>
