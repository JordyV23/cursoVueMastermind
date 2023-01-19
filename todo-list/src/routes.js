import {createRouter,createWebHistory} from "vue-router"
import Home from "./views/Home.vue"
import Aboute from "./views/Aboute.vue"

const routes = [
    {
        path:"/",
        component: Home
    }, {
        path:"/about",
        component: Aboute
    }    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export {router}