import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/components/login/login'
// import ContentManagement from '@/components/ContentManagement/index'
const newsTrends = ()=> import( '@/components/contentManagement/newsTrends')
const ContentDetails = ()=> import( "@/components/contentDetails");
const Observer = ()=> import( "@/components/contentDetails/observer");
const MyComments = ()=> import( "@/components/myComments");

Vue.use(Router)

export default new Router({
    mode: "history",
    base:'/news/',
    routes: [
        // {
        //     path: "/",
        //     name: "login",
        //     component: login
        // },
        // {
        //     path: "/ContentManagement",
        //     name: "ContentManagement",
        //     component: ContentManagement
        // },
        {
            path: "/index",
            name: "newsTrends",
            component: newsTrends
        },
        {
            path: "/contentDetails/:id",
            name: "contentDetails",
            component: ContentDetails
        },
        {
            path: "/MyComments/:id",
            name: "MyComments",
            component: MyComments
        },
        {
            path: "/observer/:id",
            name: "observer",
            component: Observer
        }
    ]
});