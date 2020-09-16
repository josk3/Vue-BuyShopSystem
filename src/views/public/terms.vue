<template>
    <div class="container-md" style="max-width: 750px">
        <div class="d-block">
            <el-button type="text" @click="goBack"><i class="el-icon-arrow-left"></i> {{$t('comm.go_back')}}</el-button>
        </div>
        <div class="p-1">
            <div class="mb-5">
                <h3 class="text-center">条款和政策</h3>
                <div class="content">
                    <p>条款和政策</p><br/>
                    <p>访问此网站，即表示您接受我们的条款</p>
                    使用本网站须遵守以下使用条款和我们的隐私政策的条件。访问本网站即表示您已阅读，理解并同意这些内容。我们可能会不时更新这些政策，您有责任检查更新。
                    <br/>
                    <p>我们将保护我们的知识产权</p>

                    本网站的内容，包括文本，图形，软件和多媒体内容，均受到法律的保护。未经授权使用我们的内容可能会违反版权，商标和其他法律。未经我们事先书面许可，除非本协议允许，否则您无权使用此内容。未经我们事先针对每种此类使用的特定书面许可，本网站上的任何内容均不得解释为以暗示或其他方式授予使用这些标记的任何许可或权利。因使用我们的商标而产生的所有商誉均必须使公司受益。
                    <br/>

                    <p>无担保/责任限制</p>

                    本网站及其内容均按“原样”和“可用”提供，没有任何形式的保证。我们不提供任何担保，包括但不限于所有权的担保，可贸易性，不侵犯第三方的权利以及对特定目的的适用性。在任何情况下，我们均不对任何损害负责（包括，
                    ，偶然和继发的损害，损失的利润，或由于遗失数据或业务中断而造成的损害），是由于基于保修，合同，侵权（包括任何过失）的使用或无法使用本网站或其内容而导致的，即使我们已被告知可能发生此类损害。某些州不允许排除对偶发性或继发性损坏的默示担保或责任限制，因此，上述限制或排除条款可能对您不适用。在这种状态下，我们的责任应限于法律允许的最大范围内。

                    <br/>

                    <p>我们网站上的信息及其更改</p>

                    本网站中包含的信息仅供参考。我们努力使发布在我们网站上的信息保持最新和正确，但是我们对网站或信息的完整性，准确性，可靠性，适用性或可用性不做任何明示或暗示的陈述或保证。产品，服务或网站上包含的有关图形的任何目的。因此，您对此类信息的任何依赖均完全由您自担风险。

                    <br/>
                    <p>您的帐户和密码</p>

                    如果您选择或已获得用户标识码，密码或任何其他信息，作为我们安全程序的一部分，则必须将此类信息视为机密信息。您不得将其透露给任何第三方。

                    <br/>

                    如果我们认为您没有遵守这些使用条款的任何规定，我们有权随时禁用任何由您选择或由我们分配的用户识别码或密码。
                    <br/>
                    如果您知道或怀疑除您之外的其他人不知道您的用户标识码或密码，则必须立即通过Support@wintopay.com通知我们，并注明电子邮件的“网站使用条款–密码题”。
                    <br/>
                    <p>隐私权</p>

                    我们的首要目标是公平，安全地处理所有数据。您提供给我们的有关您的任何信息都将存储在我们的系统上，并可能被我们以及根据我们的隐私政策协助我们提供服务的其他公司披露，处理和使用。
                    <br/>

                    我们尊重他人的知识产权。我们将审查我们收到的所有侵犯版权的声明。如果我们认为任何内容违反适用法律，则会将其删除。

                    <br/>

                    <p>我们可以随意终止此协议</p>

                    我们保留自行决定随时，以任何理由限制，暂停或终止本协议以及您对本网站全部或任何部分的访问的权利，恕不另行通知或承担责任。我们保留随时更改，暂停或终止本网站全部或任何部分的权利，恕不另行通知或承担责任。

                    <br/>

                    同样，如果我们选择根据终止条款终止任何条款，则该终止将不影响其他条款的终止;如果我们未能根据本协议采取行动或执行任何条款，则不得将其解释为放弃该规定或任何其他规定。对于特定情况，我们只会以书面形式豁免特定条款。本协议构成您与我们之间关于本网站的完整协议，并取代所有先前或同期的协议。本节标题仅为了方便起见而提供，不具有任何法律意义。该协议将确保我们的继承人，受让人，被许可人和再许可人的利益。

                    <br/>
                </div>
            </div>
            <div class="mb-3 text-center">
                <div class="d-block mb-3">
                    <el-button type="text" @click="goBack"><i class="el-icon-arrow-left"></i> {{$t('comm.go_back')}}</el-button>
                </div>
                <router-link :to="configs.loginPath"
                             class="btn btn-sm p-2 pl-1 pr-4 btn-link wpy-btn">
                    {{ $t('comm.login') }}
                </router-link>
                <router-link :to="configs.registerPath"
                             class="btn btn-sm p-2 pl-1 pr-4 btn-link wpy-btn">
                    {{ $t('comm.register') }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import configs from "@/configs";

    export default {
        name: "terms",
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
            }),
            configs() {
                return configs;
            },
        },
        mounted() {
        },
        data() {
            return {}
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
        }
    }
</script>

<style scoped>

</style>
