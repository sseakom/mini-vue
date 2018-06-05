function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get(); //将自己添加到订阅器
}

Watcher.prototype = {
    update: function () {
        var value = this.vm.data[this.exp];
        var oldValue = this.value;
        if (value !== oldValue) {
            this.value = value;
            this.cb.call(this.vm, value, oldValue);
        }
    },
    get: function () {
        Dep.target = this; //缓存自己
        var value = this.vm.data[this.exp]; //强行执行observe的get
        Dep.target = null; //释放自己
        return value;
    }
};