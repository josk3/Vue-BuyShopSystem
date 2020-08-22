<template>
    <div>
        <div class="text-center" v-loading="loading">
            <form class="form-signin" method="post" onsubmit="return false">
                <h1 class="h3 mb-3 font-weight-normal">用户登录</h1>
                <label for="inputMerNo" class="sr-only">商户号</label>
                <input type="text" id="inputMerNo" name="merNo" class="form-control"
                       v-model="userLogin.mer_no"
                       placeholder="商户号" required
                       autofocus>
                <label for="inputUsername" class="sr-only">Password</label>
                <input type="text" id="inputUsername" name="username" class="form-control"
                       v-model="userLogin.username"
                       placeholder="用户名" required>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" name="password" class="form-control"
                       v-model="userLogin.password"
                       placeholder="密码"
                       required>
                <button class="btn btn-lg btn-primary btn-block" type="submit"
                        @click="submitLogin">Sign in
                </button>
                <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
            </form>
        </div>
    </div>
</template>

<script>
    import configs from "@/configs";

    export default {
        name: "login",
        data() {
            return {
                userLogin: {
                    mer_no: '4008',
                    username: 'admin',
                    password: 'Test123456'
                },
                redirect: '',
                loading: false,
            }
        },
        methods: {
            submitLogin() {
                try {
                    this.loading = true
                    this.$store.dispatch('user/login', this.userLogin)
                        .then(() => {
                            let redirect = this.redirect && this.redirect !== configs.loginPath ? this.redirect : configs.homePath
                            this.$router.push({path: redirect})
                        })
                        .catch(() => {
                        }).finally(() => {
                        this.loading = false
                    })
                } catch (e) {
                    console.log(e)
                }
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    const query = route.query
                    if (query) {
                        this.redirect = query.redirect
                    }
                },
                immediate: true
            }
        },

    }
</script>

<style scoped src="../../../public/static/css/login.css" />
