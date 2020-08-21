const path = require('path')
const apiMocker = require('mocker-api')

module.exports = app => {
    //devServer 启动服务时, 同时启动mocker api
    apiMocker(app, path.resolve('./mocker/index.js'))
    app.listen(3721);

}
