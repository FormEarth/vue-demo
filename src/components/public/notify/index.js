import Vue from 'vue'
import DemoNotify from './DemoNotify.vue'

const messageBox = Vue.extend(DemoNotify)

DemoNotify.install = function (options, type) {
  if (options === undefined || options === null) {
    options = {
      content: ''
    }
  } else if (typeof options === 'string' || typeof options === 'number') {
    options = {
      content: options
    }
    if (type != undefined && options != null) {
      options.type = type;
    }
  }

  let instance = new messageBox({
    data: options
  }).$mount()

  document.body.appendChild(instance.$el)

  // Vue.nextTick(() => {
  //   instance.visible = true
  // })
  // 通过Vue的原型注册一个方法
  // 让所有实例共享这个方法 
  Vue.prototype.$demo_notify = (content, duration = 3000) => {
    instance.content = content;
    instance.visible = true;
    setTimeout(() => {
      instance.visible = false;
    }, duration);
  }
}

export default DemoNotify