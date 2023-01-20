import {createRouter,createWebHistory} from "vue-router"
import Home from "./views/Home.vue"
import Aboute from "./views/Aboute.vue"
import EditTodo from "./views/EditTodo.vue"

const routes = [
    {
        path:"/",
        component: Home
    }, 
    {
        path:"/about",
        component: Aboute
    },
    {
        path:"/todos/:id/edit",
        component: EditTodo,
        props: true,
    }    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export {router}