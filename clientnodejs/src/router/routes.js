import { createRouter, createWebHistory } from 'vue-router'
// import useEventBus from '../composables/useEventBus'
import useEventBus from '../composables/useEventBus'



// admin
import AdminComp from './../components/Admin'
import LoginAdmin from './../components/admin/Login'
import ResetPasswordAdmin from './../components/admin/ResetPassword'
import DashboardAdmin from './../components/admin/Dashboard'
import ProfileAdmin from './../components/admin/Profile'

import CategoryAdmin from './../components/admin/Category'
import CustomerAdmin from './../components/admin/Customer'
import ManagementAdmin from './../components/admin/ManagementAdmin'
import AdminOrderDetails from './../components/admin/AdminOrderDetails'
import AdminOrderPrintPDF from './../components/admin/AdminOrderPrintPDF'
import OrderAdmin from './../components/admin/Order'
import ProductAdmin from './../components/admin/Product'
import ProductAdd from './../components/admin/ProductAdd'
import ProviderAdmin from './../components/admin/Provider'
import StatisticalAdmin from './../components/admin/Statistical'
import ProductDetails from './../components/admin/ProductDetails'
import WareHouse from './../components/admin/Warehouse'
import WarehouseImport from './../components/admin/WarehouseImport'
import ImportDetails from './../components/admin/ImportDetails'
import ImportProduct from './../components/admin/ImportProduct'

// admin order 
import AdminDeliveredComp from './../components/admin/purchase/AdminDeliveredComp'
import AdminDeliveringComp from './../components/admin/purchase/AdminDeliveringComp'
import AdminWaitForConfirmation from './../components/admin/purchase/AdminWaitForConfirmation'
import AdminWaitingForShipping from './../components/admin/purchase/AdminWaitingForShipping'

// user 
import UserComp from './../components/User'
import LoginUser from './../components/user/Login'
import RegisterUser from './../components/user/Register'
import ResetPasswordUser from './../components/user/ResetPassword'

import AccountUser from './../components/user/Account'
import ProfileUser from './../components/user/account/Profile'
import ChangePasswordUser from './../components/user/account/ChangePassword'
import PurchaseOrderUser from './../components/user/account/PurchaseOrder' 
import ShippingAddressUser from './../components/user/account/ShippingAddress'  
import OrderDetails from './../components/user/account/OrderDetails'  

import DashboardUser from './../components/user/Dashboard'
import ProductUserDetails from './../components/user/ProductUserDetails'
import UserOrder from './../components/user/UserOrder'
import InforUser from './../components/user/InforUser' 

// user order 
import CancelledComp from './../components/user/purchase/CancelledComp'
import DeliveredComp from './../components/user/purchase/DeliveredComp'
import DeliveringComp from './../components/user/purchase/DeliveringComp'
import WaitForConfirmation from './../components/user/purchase/WaitForConfirmation'
import WaitingForShipping from './../components/user/purchase/WaitingForShipping'


// other 
import NotFound from './../components/NotFound'
import ChangeComp from './../components/Change'

// import Register from './../components/CompRegister'
// import Post from './../components/CompPost'
// import PostEdit from './../components/CompPostEdit'
// import DetailPost from './../components/DetailPost'
// import MyPost from './../components/MyPosts'
// import PostNew from './../components/CompPostNew'
// import CompError from './../components/CompError'
// import NotFound from './../components/NotFound'
// import InFor from './../components/Infor'
// import Menu from './../components/Menu'
// import ForgotPassword from './../components/ForgotPassword'

const routes = [

    {
        path: '/main',
        component: UserComp,
        name:'UserComp',
        children : [
            {path:'login',name:'LoginUser',component:LoginUser},
            {path:'register',name:'RegisterUser',component:RegisterUser},
            {path:'reset-password',name:'ResetPasswordUser',component:ResetPasswordUser},

            {path:'account',name:'AccountUser',component:AccountUser,
                children : [
                    {path:'profile',name:'ProfileUser',component:ProfileUser},
                    {path:'change-password',name:'ChangePasswordUser',component:ChangePasswordUser},
                    {
                        path:'purchase-order',
                        name:'PurchaseOrderUser',
                        component:PurchaseOrderUser,
                        children : [
                            {path:'cancelled',name:'CancelledComp',component:CancelledComp},
                            {path:'delivered',name:'DeliveredComp',component:DeliveredComp},
                            {path:'delivering',name:'DeliveringComp',component:DeliveringComp},
                            {path:'confirmation',name:'WaitForConfirmation',component:WaitForConfirmation},
                            {path:'shipping',name:'WaitingForShipping',component:WaitingForShipping},
                        ]
                    },
                    {path:'shipping-address',name:'ShippingAddressUser',component:ShippingAddressUser},
                    {path:'order-details/:id',name:'OrderDetails',component:OrderDetails},
                ]
            },

            {path:'dashboard',name:'DashboardUser',component:DashboardUser},
            {path:'product/:id',name:'ProductUserDetails',component:ProductUserDetails},
            {path:'order',name:'UserOrder',component:UserOrder},
            {path:'infor-user',name:'InforUser',component:InforUser},
        ]
    },   
    {
        path: '/admin',
        component: AdminComp,
        name:'AdminComp',
        children : [
            {path:'login',name:'LoginAdmin',component:LoginAdmin},
            {path:'reset-password',name:'ResetPasswordAdmin',component:ResetPasswordAdmin},
            {path:'dashboard',name:'DashboardAdmin',component:DashboardAdmin},
            {path:'profile-admin',name:'ProfileAdmin',component:ProfileAdmin},

            {path:'category',name:'CategoryAdmin',component:CategoryAdmin},
            {path:'customer',name:'CustomerAdmin',component:CustomerAdmin},
            {path:'management-admin',name:'ManagementAdmin',component:ManagementAdmin},
            {
                path:'order',
                name:'OrderAdmin',
                component:OrderAdmin,
                children : [
                    {path:'delivered',name:'AdminDeliveredComp',component:AdminDeliveredComp},
                    {path:'delivering',name:'AdminDeliveringComp',component:AdminDeliveringComp},
                    {path:'confirmation',name:'AdminWaitForConfirmation',component:AdminWaitForConfirmation},
                    {path:'shipping',name:'AdminWaitingForShipping',component:AdminWaitingForShipping},
                ]
            },
            {path:'order-details/:id',name:'AdminOrderDetails',component:AdminOrderDetails},
            {path:'print/:id',name:'AdminOrderPrintPDF',component:AdminOrderPrintPDF},
            {path:'product',name:'ProductAdmin',component:ProductAdmin},
            {path:'product/add',name:'ProductAdd',component:ProductAdd},
            {path:'product/:id',name:'ProductDetails',component:ProductDetails},
            {path:'provider',name:'ProviderAdmin',component:ProviderAdmin},
            {path:'warehouse',name:'WareHouse',component:WareHouse},
            {path:'warehouse-import',name:'WarehouseImport',component:WarehouseImport},
            {path:'warehouse-import/:id',name:'ImportDetails',component:ImportDetails},
            {path:'import-product',name:'ImportProduct',component:ImportProduct},
            {path:'statistical',name:'StatisticalAdmin',component:StatisticalAdmin},
        ]
    }, 
    {path: '/',component: ChangeComp,name:'ChangeComp'},
    {path: '/:NotFound(.*)*',component: NotFound,name:'NotFound'}


//     {path: '/login',component: Login,name:'Login'},    
//     {path: '/register',component: Register,name:'Register'} ,
//     {path: '/reset-password',component: ForgotPassword,name:'ForgotPassword'} ,
//     {path: '',component: Post,name:'Post'}, 
//     {path: '/my',component: MyPost,name:'MyPost'}, 
//     {path: '/posts/:id',component: DetailPost,name:'DetailPost'}, 
//     {path: '/post/edit',component: PostEdit,name:'PostEdit'}, 
//     {path: '/post/new',component: PostNew,name:'PostNew'}, 
//     {path: '/error',component: CompError,name:'CompError'}, 
//     {path: '/infor',component: InFor,name:'InFor'}, 
//     {path: '/menu',component: Menu,name:'Menu'}, 
//     {path: '/:NotFound(.*)*',component: NotFound,name:'NotFound'}
    
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to,from,next)=>{
    if(to.path.includes('/main')){

        if(to.path == '/main' || to.path == '/main/'){
            next({name:'DashboardUser'});
        }

        if(to.path.includes('/main/product/')) next(); // (1) 
        if(to.path.includes('/main/order')) next(); // (1) 

        let excludePages = ['/main/login','/main/dashboard','/main/register','/main/reset-password'];
        let requiredlogin = !excludePages.includes(to.path); 

        let user = localStorage.getItem('user');
        if(requiredlogin && !user){
            if(to.path != "/main"){
                next({name:'LoginUser'});
                const { emitEvent } = useEventBus();
                emitEvent('eventError401',"B???n ch??a ????ng nh???p !");
            }
        }

        // account
        if(to.path == '/main/account' || to.path == '/main/account/'){
            next({name:'ProfileUser'});
        }

        // purchase-order
        if(to.path == '/main/account/purchase-order' || to.path == '/main/account/purchase-order/'){
            next({name:'WaitForConfirmation'});
        }

    }

    if(to.path.includes('/admin')){
        let excludePages = ['/admin/login','/admin/reset-password'];
        let requiredlogin = !excludePages.includes(to.path);
        let admin = localStorage.getItem('admin');
        if(requiredlogin && !admin){
            if(to.path != "/admin"){
                next({name:'LoginAdmin'});
                const { emitEvent } = useEventBus();
                emitEvent('eventError401',"Admin ch??a ????ng nh???p !");
            }
        }
    }
    next();





    // include l?? t??m ki???m chu???i trong chu???i v?? d??? : "I love H???c JavaScript".includes("love") = true 
    // (1) : t??m trong c??i to.path hi???n t???i n???u c?? /main/product/ ngh??a l?? ??ang mu???n ?????n xem s???n ph???m chi 
    // ti???t => kh??ng c???n ??i???u ki???n g?? c??? => cho ??i xem lu??n => next()
    // 

    // let excludePages = ['/main/login','/main/dashboard','/main/register','/main/reset-password'];
    // let requiredlogin = !excludePages.includes(to.path); (2)
    // t??m ki???m gi?? tr??? to.path c?? trong m???ng excludePages hay kh??ng n???u kh??ng c?? v?? kh??ng c?? bi???n user n???a 
    // th?? b???t ????ng nh???p
    // excludePages l?? m???ng c??c string ???????c ph??p v??o m?? kh??ng c???n ????ng nh???p 
    // => ri??ng (1) ta l??m ri??ng b???i v?? product/... => nhi???u n??n kh??ng li???t k?? h???t v??o m???ng 

    // n??i chung l?? ch??? c???n d??ng includes t??m ki???m chu???i 
    // c??n t??m ki???m ki???u nh?? th??? n??o th?? t??y ta v???n d???ng cho h???p l?? , code ng???n l?? ???????c 

    // if(!to.path.indexOf('/admin')){
    //     let excludePages = ['/admin/login','/admin/dashboard'];
    //     let requiredlogin = !excludePages.includes(to.path);
    //     let user = localStorage.getItem('admin');
    //     if(requiredlogin && !user){
    //         next({name:'LoginAdmin'});
    //         console.log("Admin ch??a ????ng nh???p !");
    //     }
    // }

    // let excludePages = ['/login','/register','/reset-password'];
    // let requiredlogin = !excludePages.includes(to.path);
    // let user = localStorage.getItem('user');
    // if(requiredlogin && !user){
    //     if(to.path != "/" && to.path.indexOf('/posts/')){
    //         next({name:'Login'});
    //         alert("B???n ch??a ????ng nh???p !");
    //     }
    // }

})

// router.beforeEach((to,from,next)=>{
//     let excludePages = ['/login','/register','/reset-password','/menu'];
//     let requiredlogin = !excludePages.includes(to.path);
//     let user = localStorage.getItem('user');
//     if(requiredlogin && !user){
//         if(to.path != "/" && to.path.indexOf('/posts/')){
//             next({name:'Login'});
//             alert("B???n ch??a ????ng nh???p !");
//         }
//     }

//     if(to.path.indexOf('/posts/')){
//         const { emitEvent } = useEventBus();
//         emitEvent('geneEvent_route',null);
//     }
//     next();
// })


// router.beforeEach((to,from,next)=>{
//     let excludePages1 = ['/login','/register','/reset-password'];
//     let excludePages2 = ['/login','/register','/reset-password'];
//     let requiredlogin1 = !excludePages1.includes(to.path);
//     let requiredlogin2 = !excludePages2.includes(to.path);

//     let user = localStorage.getItem('user');
//     let admin = localStorage.getItem('admin');

//     if(requiredlogin1 && !user){
//         if(to.path != "/" && to.path.indexOf('/posts/')){
//             next({name:'Login'});
//             alert("B???n ch??a ????ng nh???p !");
//         }
//     }

//     if(requiredlogin2 && !admin){
//         if(to.path != "/" && to.path.indexOf('/posts/')){
//             next({name:'Login'});
//             alert("B???n ch??a ????ng nh???p !");
//         }
//     }

//     if(to.path.indexOf('/posts/')){
//         const { emitEvent } = useEventBus();
//         emitEvent('geneEvent_route',null);
//     }
//     next();
// })





export default router
