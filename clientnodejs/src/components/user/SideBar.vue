<template>
    <div id="sidebar" :class="{min:status,max:!status}">
        <div id="title" :class="{minh:status,maxh:!status}" ><i class="fa-brands fa-galactic-senate"></i> {{user.fullname}}</div>
        <div>
            <li id="myaccount" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <span><i class="fa-solid fa-list"></i></span><span >My Account</span>
            </li>
            <label :class="{under:true,minl:status,maxl:!status}"></label>
            <div class="collapse" id="collapseExample">
                <div>
                    <li @click="liClick(0)" :class="{liClick:arr[0]}"><span><i class="fa-solid fa-id-card-clip"></i></span><span>Profile</span></li>
                    <label :class="{under:true,minl:status,maxl:!status}"></label>
                    <li @click="liClick(1)" :class="{liClick:arr[1]}"><span><i class="fa-solid fa-key"></i></span><span >Change Password</span></li>
                    <label :class="{under:true,minl:status,maxl:!status}"></label>
                    <li @click="liClick(2)" :class="{liClick:arr[2]}"><span><i class="fa-solid fa-map-location-dot"></i></span><span >Shipping Address</span></li>
                    <label :class="{under:true,minl:status,maxl:!status}"></label>
                </div>
            </div>
            <li @click="liClick(3)" :class="{liClick:arr[3]}" id="purchase"><span style="padding-left:12px;padding-right:11px"><i class="fa-brands fa-shopify"></i></span><span>Purchase Order</span></li>
        </div>
        <div @click="status=!status" id="change"><i class="fa-solid fa-arrows-left-right"></i></div>
    </div>
</template>
<script>

export default {
    name: "SideBar",
    components: {

    },
    data(){
        return{
            status:false,
            arr:[false,false,false,false],
            user:{
                id:null,
                fullname:'',
                username:'',
                email: '',
                phone: '',
                google_id:null,
                date_of_birth:null,
                url_img:null,
                gender:null,
                address:'',
                status:null,
                access_token:'',
                refreshToken:'',
                created_at:null,
                updated_at:null,
                email_verified_at:null,
            },
        }
    },
    mounted(){
      this.user = JSON.parse(window.localStorage.getItem('user'));
    },
    // created () {
    //     window.addEventListener('scroll', this.handleScroll);  // header
    // },
    // unmounted () {
    //     window.removeEventListener('scroll', this.handleScroll); // header
    // },
    methods: {
        liClick:function(i){
            this.arr = [false,false,false,false];
            this.arr[i] = true;
            if(i==0) this.$router.push({name:"ProfileUser"});
            if(i==1) this.$router.push({name:"ChangePasswordUser"});
            if(i==2) this.$router.push({name:"ShippingAddressUser"});
            if(i==3) this.$router.push({name:"PurchaseOrderUser"});
        },

        // // sidebar
        // handleScroll () {
        //     var currentScrollPos = window.pageYOffset;
        //     if (this.prevScrollpos > currentScrollPos) {
        //         document.getElementById("sidebar").style.left = "0px";
        //     } else {
        //         document.getElementById("sidebar").style.left = "-400px";
        //     }
        //     this.prevScrollpos = currentScrollPos;
        // },
        // // sidebar
    },
}
</script>
<style scoped>
*{
    list-style: none;
}
/* z-index l?? m???t thu???c t??nh r???t m???nh , n?? c?? th??? ph??n chia ra c??c l???p 
V?? d??? z-index : 2 s??? n???m tr??n z-index : 1 
V?? d??? Thanh SideBar c???a user c?? m???t s??? style b??? slide trong user ???? l??n 
=> ????? fix th?? cho z-index : 1 , m???c kh??c ta c??ng c?? head c?? z-index : 1 
m?? sidebar n???m sau n??n ??u ti??n h??n header => k???t q???a l?? sidebar ???? l??n header 

=> fix b???ng c??ch cho header : z-index : 2 , sidebar : z-index : 1
    ????? cho Header lu??n l?? c??i to nh???t , n???m tr??n h???t 

  + Ta c?? th??? d??ng z-index ????nh s??? t??? 1 ?????n n ????? ph??n l???p => m???t thu???c t??nh r???t m???nh  

*/
#sidebar{
    z-index: 1;
    background-color: #2A2A2E;    
    /* #1e1e21 */
    height: 400px;
    transition: all 0.6s ease;
    position: relative;
    padding-top:10px;
    margin-bottom: 20px;
}
#change {
    position: absolute;
    height: 40px;
    align-content:center;
    align-items: center;
    font-size: 26px;
    top: 360px;
    color: white;
    background-color: #0085FF;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    cursor: pointer;
    transition: all 0.6s ease;
}
#change:hover {
    color:black;
}
#sidebar li {
    height: 40px;
    font-size: 18px;
    display: flex;
    line-height: 100%;
    align-items: center;
    align-content: center;
    color:white;
    transition: all 0.6s ease;
    /* thu???c t??nh gi??p cho text kh??ng t??? ?? xu???ng d??ng, thamkhao : https://viblo.asia/p/xu-ly-text-trong-css-nhu-the-nao-63vKjvqVK2R */
    white-space: nowrap;  
    overflow: hidden;  
    margin-left: 10px;
    margin-right: 10px;
    border-radius:6px ;
    cursor: pointer;
}
#sidebar li:hover {
    background-color: #0085FF;
    /* z-index: 1; */
    overflow: visible;
    color: white;
}

#sidebar li span:nth-child(1){
    border-radius:6px ;
    background-color: white;
    color:#0085FF;
    margin: auto 0px;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    transition: all 0.6s ease;
}
#sidebar li span:nth-child(1):hover {
    background-color: #0085FF;
    color: white;
}

#sidebar li span:nth-child(2){
    padding-left: 7px;
    transition: all 0.6s ease;
    line-height: 40px;
    min-width: 0px;
}
#sidebar li:hover span:nth-child(2){
    background-color: #0085FF;
    display: block;
    min-width: 180px;
    border-top-right-radius:6px ;
    border-bottom-right-radius:6px ;
}

.linoClick{
    border-left: 6px solid transparent;
}
.liClick{
    background-color: red;
}
.min{
    width: 64px;
}
.max {
    width: 250px;
}

#title {
    padding-left:10px;
    padding-right: 10px;
    color:white;
    transition: all 0.6s ease;
    /* th??m 3 ch???m ?????ng sau n???u nh?? d??i */
    text-overflow: ellipsis;
    white-space: nowrap; 
    overflow: hidden;
    /* th??m 3 ch???m ?????ng sau n???u nh?? d??i */
    margin-bottom: 6px;
    color: white;
    background-color: #F84B2F;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 6px;
    font-weight: 600;
    font-style: italic;
}
.minh{
    height: 0px;
    line-height: 0px;
}
.maxh {
    height: 40px;
    line-height: 40px;
}
.under {
    transition: all 0.6s ease;
    background-color: white;
    white-space: nowrap;
    overflow: hidden;
    height: 3px;
    margin-bottom: 2px;
    margin-left: 10px;
    margin-right: 10px;
    padding-right: 10px;
}
.minl{
    width: 40px;
    height: 3px;
}
.maxl {
    width: 230px;
    height: 3px;
}
</style>