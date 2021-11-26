<template>
    <div>
        <mu-drawer :open.sync="open" docked :right="false" :z-depth="2">
            <mu-list toggle-nested>
                <mu-list-item button :ripple="false" nested :open="menu_open === 'system'"
                    @toggle-nested="menu_open = arguments[0] ? 'system' : ''">
                    <mu-list-item-action>
                        <mu-icon value="dashboard"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>System</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item button :ripple="false" slot="nested">
                        <mu-list-item-title>Api Manager</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button :ripple="false" slot="nested">
                        <mu-list-item-title>System Config</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button :ripple="false" slot="nested">
                        <mu-list-item-title>Scheduled Task</mu-list-item-title>
                    </mu-list-item>
                </mu-list-item>
                <mu-list-item button :ripple="false" nested :open="menu_open === 'user'"
                    @toggle-nested="menu_open = arguments[0] ? 'user' : ''">
                    <mu-list-item-action>
                        <mu-icon value="send"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>User</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item button :ripple="false" slot="nested">
                        <mu-list-item-title>User Manager</mu-list-item-title>
                    </mu-list-item>
                </mu-list-item>
                </mu-list-item>
                <mu-list-item button>
                    <mu-list-item-title>Menu Item 1</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button>
                    <mu-list-item-title>Menu Item 2</mu-list-item-title>
                </mu-list-item>
                <mu-list-item @click="open = false" button>
                    <mu-list-item-title>Close</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-drawer>
        <mu-paper :z-depth="1" style="margin-left: 256px;">
            <mu-breadcrumbs>
                <mu-breadcrumbs-item disabled :key="1">System</mu-breadcrumbs-item>
                <mu-breadcrumbs-item disabled :key="2">Interface Manager</mu-breadcrumbs-item>
            </mu-breadcrumbs>
            <mu-data-table stripe :columns="columns" :sort.sync="sort" :data="list">
                <template slot-scope="scope">
                    <td>{{scope.row.path}}</td>
                    <td>{{scope.row.method}}</td>
                    <td>{{scope.row.name}}</td>
                    <td style="text-align: center;">
                        <mu-checkbox v-model="scope.row.requireLogin"
                            @change="require_login_change(scope.row.interfaceId,scope.row.requireLogin)"></mu-checkbox>
                    </td>
                    <td>{{scope.row.permission}}</td>
                    <td style="text-align: center;">
                        <mu-button icon color="primary" :ripple="false">
                            <mu-icon value="edit"></mu-icon>
                        </mu-button>
                        <mu-button v-if="scope.row.allowDelete" icon color="red500" :ripple="false">
                            <mu-icon value="delete"></mu-icon>
                        </mu-button>
                    </td>
                </template>
            </mu-data-table>
        </mu-paper>
    </div>
</template>
<script>
    export default {
        name: 'system_manager',
        data() {
            return {
                docked: false,
                open: true,
                menu_open: 'system',
                menu: {
                    system: true,
                    send: false
                },
                sort: {
                    name: '',
                    order: 'asc'
                },
                columns: [
                    { title: 'api path', name: 'path', width: 160 },
                    { title: 'request type', name: 'method', align: 'center' },
                    { title: 'api name', name: 'name', align: 'center', width: 160 },
                    { title: 'require login', name: 'requireLogin', align: 'center' },
                    { title: 'permission', name: 'permission', align: 'center', width: 160 },
                    { title: 'operation', name: 'operation', width: 180 },
                    { name: 'allowDelete', },
                    { name: 'interfaceId', }
                ],
                list: []
            }
        },
        created() {
            this.get_data()
        },
        methods: {
            get_data() {
                this.$http.manager.interface_list_query().then(res => {
                    if (res.data.code === '2000') {
                        this.list = res.data.data.apis
                    }
                })
            },
            require_login_change(id, value) {
                console.log("-----")
                this.$http.manager.interface_modify({ interfaceId: id, requireLogin: value }).then(res => {
                    if (res.data.code === '2000') {
                        this.$demo_notify("修改成功");
                    }
                })
            }
        },
    }
</script>
<style scoped>
    .mu-drawer {
        margin-top: 55px;
    }

    .mu-paper-round {
        border-radius: 0;
    }
</style>