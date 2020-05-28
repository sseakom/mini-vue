function Vue(options) {
  var self = this
  this.data = options.data
  this.methods = options.methods

  Object.keys(this.data).forEach(function (key) {
    self.proxyKeys(key)
  })

  observe(this.data)
  new Compile(options.el, this)
  options.mounted.call(this)
}

Vue.prototype = {
  //修改data属性中的get set 方法  data->vm的绑定
  proxyKeys: function (key) {
    var self = this
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function () {
        return self.data[key]
      },
      set: function (newVal) {
        self.data[key] = newVal
      },
    })
  },
}
