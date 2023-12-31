import {createRouter, createWebHashHistory} from 'vue-router'


import usersListView from '../views/users/usersListView.vue'
import UserView from "@/views/users/UserView";



const DEFAULT_TITLE = 'ПОЛИС ТЕСТ';
const routes = [
    {
        path: '/',
        name: 'home',
        redirect: () => ({path: '/users-list'}),
    },
    {
        path: '/users-list',
        name: 'usersList',
        component: usersListView,
        meta: {
            // header: "Список пользователей",
            navStartState: true,
            title: 'Список пользователей'
        }
    },
    {
        path: '/users/:id/',
        name: 'users',
        component: UserView,
        meta: {
            header: "Пользователь",
            navStartState: false,
            title: 'Пользователь'
        }
    },
]

const router = createRouter({
    "history": createWebHashHistory(),
    routes
})

router.afterEach((to) => {
    document.title = to.meta?.title? `${to.meta?.title} - ${DEFAULT_TITLE}` : DEFAULT_TITLE
});

export default router
