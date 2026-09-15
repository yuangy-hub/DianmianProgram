import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RoleList from '../views/RoleList.vue'
import RoleDetail from '../views/RoleDetail.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/role-list',
        component: RoleList
    },
    {
        path: '/role-detail/:id',
        component: RoleDetail
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router


