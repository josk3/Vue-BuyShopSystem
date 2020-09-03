import Vue from 'vue'
import Clipboard from 'clipboard'

/**
 * https://zenorocha.github.io/clipboard.js
 */
function clipboardSuccess() {
  Vue.prototype.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}

function clipboardError() {
  Vue.prototype.$message({
    message: 'Copy failed',
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
