import Vue from 'vue'
import Clipboard from 'clipboard'
import i18n from "@/service/i18n";

/**
 * https://zenorocha.github.io/clipboard.js
 */
function clipboardSuccess() {
  Vue.prototype.$message({
    message: i18n.t('comm.copy_success'),
    type: 'success',
    duration: 1500
  })
}

function clipboardError() {
  Vue.prototype.$message({
    message: i18n.t('comm.copy_fail'),
    type: 'error'
  })
}

export default function newClipboard(target) {
  const clipboard = new Clipboard(target)
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
}
