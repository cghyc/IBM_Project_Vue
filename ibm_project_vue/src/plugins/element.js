import Vue from 'vue'
// import { Button } from 'element-ui'
// import { Form, FormItem } from 'element-ui'
// import { Input } from 'element-ui'
// import { Table, TableColumn } from  'element-ui'
// import { Dialog } from 'element-ui'
// //导入弹窗提示组件
// import { Message } from 'element-ui'

import { 
    Button, 
    Form, FormItem, 
    Input, 
    Table, TableColumn,RadioGroup,Radio,
    Dialog,
    Message,
    Container,Header,Aside,Main,
    Menu,Submenu,MenuItemGroup,MenuItem,
    Drawer, 
    Pagination,
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Drawer)
Vue.use(Pagination)



//将Message挂载到Vue的原型对象上，每个组件可以使用this.$message使用
Vue.prototype.$message = Message
