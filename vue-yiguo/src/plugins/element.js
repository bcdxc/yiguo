import Vue from 'vue'
import { Button, Dialog, Form, FormItem, Input, Menu, MenuItem, MenuItemGroup, Message, Option, Pagination, Popconfirm, Popover, RadioButton, RadioGroup, Select, Submenu, Table, TableColumn, Tag, Upload } from 'element-ui'
// import { Message } from 'element-ui';

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Popconfirm)
Vue.use(Popover)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Pagination)
// Vue.use(Message)
Vue.prototype.$message = Message