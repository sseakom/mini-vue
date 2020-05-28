function Observer(data) {
  this.data = data
  this.walk(data)
}

Observer.prototype = {
  walk: function (data) {
    var self = this
    Object.keys(data).forEach(function (key) {
      self.defineReactive(data, key, data[key])
    })
  },
  defineReactive: function (data, key, val) {
    var dep = new Dep()
    var childObj = observe(val) //如果是子对象 递归调用oberve
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: true,
      get: function getter() {
        if (Dep.target) {
          dep.addSub(Dep.target)
        }
        return val
      },
      set: function setter(newVal) {
        if (newVal == val) {
          return
        }
        val = newVal
        dep.notify()
      },
    })
  },
}

function observe(value) {
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observer(value)
}

function Dep() {
  this.subs = [] //观察者列表
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update() //执行watch中的回调 更新到视图
    })
  },
}
Dep.target = null //用來存儲wathcer實例
