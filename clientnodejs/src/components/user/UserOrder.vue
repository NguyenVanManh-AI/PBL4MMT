<template>
  <div id="big_user_order">
    <div id="big">
      <div class="row pl-12 pb-6" style="font-weight:bold">
        <div class="col-6"><input type="checkbox" v-model="mainStatus" @change="allStatus(mainStatus)"> <span style="margin-left:20px">Product</span></div>
        <div class="col-2">Price($)</div>
        <div class="col-2">Quantity</div>
        <div class="col-2">Control</div>
      </div>
      <hr>
      <div v-if="user_order != null">
        <div class="row pl-12 pb-3 pt-3 pr_border" v-for="(pr,index) in user_order" :key="index">
          <div class="col-6 pr_infor">
            <input type="checkbox" v-model="pr.status" @change="saveLocal()">
            <div class="pr_img col-4" >
              <img :src="API_URL+'/'+pr.image_path"> 
            </div>
            <div class="pr_name col-8">
              <div class="alert alert-danger" role="alert" v-if="pr.buy_number > pr.quantity">The number of products is only {{pr.quantity}}, please choose less quantity !</div>
              <span><i class="fa-solid fa-feather-pointed"></i> {{pr.product_name}}</span><br>
            </div>
          </div>
          <div class="col-2 d-flex d-flex align-items-center pr_num">{{new Intl.NumberFormat().format(pr.price)}}$</div>
          <div class="col-2 d-flex d-flex align-items-center pr_num">
            <button type="button" style="color:gray;margin-right:6px;outline:none" @click="pr.buy_number++;saveLocal();"><i class="fa-solid fa-square-plus"></i></button>
            <input type="number" disabled v-model="pr.buy_number" min="0" class="form-control col-5">
            <button type="button" style="color:gray;margin-left:6px;outline:none" @click="if(pr.buy_number > 0) pr.buy_number--;saveLocal();"><i class="fa-solid fa-square-minus"></i></button>
          </div>
          <div class="col-2 d-flex d-flex align-items-center"><button type="button" @click="user_order.splice(index, 1);saveLocal();" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i> Delete</button></div>
        </div>
      </div>
      <hr>
      <div class="row pl-12 pb-3 pt-3 ">
        <div class="col-6 d-flex align-items-center">
            <button type="button" class="btn btn-danger" @click="deleteAll()"><i class="fa-solid fa-trash"></i> Delete</button>
        </div>
        <div class="col-4 d-flex align-items-center total">
          Total payment (<span>{{new Intl.NumberFormat().format(totalProduct)}}</span> product) : <span>{{new Intl.NumberFormat().format(totalPrice)}}$</span>
        </div>
        <div class="col-2 d-flex align-items-center">
            <button type="button" class="btn btn-outline-success" @click="buyNow()"><i class="fa-solid fa-cart-shopping"></i> Buy Now </button>
        </div>

      </div>
    </div>
    <Notification></Notification>
  </div>
</template>

<script>
import config from '../../config.js';
import Notification from './Notification'
// import FilePicker from './FilePicker.vue';
import BaseRequest from '../../restful/user/core/BaseRequest';
import useEventBus from '../../composables/useEventBus'
// import ParticleVue32 from "./particle/ParticleVue32.vue";

export default {
    name:"UserOrder",
    components:{
      Notification,
    },
    data(){
      return{
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

        domain:'',
        user_order:null,
        products:[],
        API_URL : '',
        totalProduct:0,
        totalPrice:0,
        mainStatus:false,
      }
    },
    setup() {
        document.title = "Meta Shop - Order"
    },
    mounted(){

      this.user = JSON.parse(window.localStorage.getItem('user'));

      this.API_URL = config.API_URL; 
      this.user_order = JSON.parse(window.localStorage.getItem('user_order'));
      this.domain = config.API_URL;

      // ????? c???i thi???n th??m th?? ch??? c???n l???y ra s??? l?????ng c???a nh???ng s???n ph???m m??nh ??ang order 
      // kh??ng l???y ra h???t database , kh??ng l???y ???nh ra => c???i thi???n sau (ch??a k??? c??n x??t ?????n tr?????ng h???p ??ang order th?? 
      // tr??n server x??a s???n ph???m ???? ??i n???a)

      BaseRequest.get('api/dashboard-customer/all-products3')
      .then( (data) =>{
        this.products = data.product.data ;
      }) 
      .catch(()=>{
        
      })

      if(this.user_order != null){
        for(var i=0;i<this.user_order.length ;i++){
          // ki???m tra s??? l?????ng 
          for(var j=0;j<this.products.length ;j++){
            if(this.user_order[i].product_id == this.products[j].product_id) this.user_order[i].quantity == this.products[j].quantity;
          }
          // kh??ng n??n reset check , ng?????i d??ng click v??o c??i n??o th?? l??u l???i v??o local nh?? th??? => ???? l?? t??nh n??ng  
          if(this.user_order[i].status == true) {
            this.totalProduct++;
            this.totalPrice += this.user_order[i].price * this.user_order[i].buy_number;
          }
        }
      }
    },
    methods:{
      saveLocal:function(){
        window.localStorage.setItem('user_order',JSON.stringify(this.user_order));
        const { emitEvent } = useEventBus();
        emitEvent('eventUserOrder');

        // t??nh l???i s??? l?????ng v?? ti???n 
        if(this.user_order != null){
          this.totalProduct = 0 ;
          this.totalPrice = 0 ;
          for(var i=0;i<this.user_order.length ;i++){
            if(this.user_order[i].status == true) {
              this.totalProduct++;
              this.totalPrice += this.user_order[i].price * this.user_order[i].buy_number;
            }
          }
        }
      },
      allStatus:function(mainStatus){
        for(var i=0;i<this.user_order.length;i++){
          if(mainStatus == true) this.user_order[i].status = true;
          else this.user_order[i].status = false;
        }
        this.saveLocal();
        console.log(this.user_order);
      },
      deleteAll:function(){
        // for(var i=0;i<this.user_order.length;i++){
        //   if(this.user_order[i].status == true) this.user_order.splice(i, 1);
        // }
        this.user_order = this.user_order.filter(function(pr){
          if(pr.status == true) return false ; 
          else return true; 
        });
        this.saveLocal();
      },
      buyNow:function(){
        // khi t??nh ti???n (total) th?? t??nh sao k??? n?? , d?? c?? qu?? s??? l?????ng hay kh??ng c??ng k??? 
        // ch??? khi click Buy Now m??nh m???i b??o . Buy Now s??? l?????t qua t???t c??? v?? l???y s???n ph???m c?? status l?? true  
        // S???n ph???m c?? status l?? true nh??ng s???n ph???m v?????t qu?? s??? l?????ng th?? b??o ra 
        // => ng?????i d??ng c?? 2 l???a ho???c l?? b??? ch???n , ho???c l?? gi???m s??? l?????ng => ch???c ch??? 
        // (t??? ????y ta th???y n???u ng?????i d??ng b??? ch???n th?? OK t???t nhi??n s??? ???????c , ho???c l?? ng?????i d??ng gi???m s??? l?????ng cx OK)
        // N???u kh??ng c?? l???i th?? g???i l??n server s??? l?????ng mua v?? id c???a s???n ph???m t????ng ???ng  

        const { emitEvent } = useEventBus();
        var buyNow=[];
        for(var i=0;i<this.user_order.length;i++){
          if(this.user_order[i].status == true) {
            if(this.user_order[i].buy_number > this.user_order[i].quantity) {
              emitEvent('eventUserError','The number of '+this.user_order[i].product_name+' cannot exceed !');
              return ; // t???t nhi??n ch??? c???n m???t c??i l???i th??i th?? cx d???ng l???i 
            }
            else {
                var pr = {
                  product_id:this.user_order[i].product_id,
                  buy_number:this.user_order[i].buy_number,
                  product_name:this.user_order[i].product_name,
                  price:this.user_order[i].price,
                }
                buyNow.push(pr);
            }
          }
        }

        // ki???m tra xem ????ng nh???p hay ch??a 
        if(window.localStorage.getItem('user') == null) {
          emitEvent('eventUserError','You need to login !');
          setTimeout(()=>{
            this.$router.push({name:'LoginUser'}); 
            window.location=window.origin + window.pathname ;
            return ; 
          }, 1000);
          return ; 
        }

        // kh??ng c?? g?? h???t th?? th??i 
        if(buyNow.length == 0) {
          return ; 
        }

        var buy_data = {
          buy_now : buyNow,
          id_user : this.user.id,
          totalPrice : this.totalPrice,
        }

        BaseRequest.post('api/customer-order/buy-now',buy_data)
        .then( () =>{
          // console.log(data);
          // sau khi order th??nh c??ng th?? x??a 
          this.deleteAll();
          emitEvent('eventUserSuccess','Buy Product Success !');
        }) 
        .catch(error=>{
          // console.log(error.response.data);
          emitEvent('eventUserError',error.response.data.error);
        })

        // n???u buy th??nh c??ng th?? l?????t qua c??c ph???n t??? c?? id ???? trong user_order v?? x??a n?? ??i 
        // ta kh??ng l??m gi???ng nh?? b??n productDetail l?? n???i chu???i r???i l??n server t??ch chu???i n???a . 
        // ta g???i nguy??n c??? object nh?? sau 
          // {
          //     "buy_now":[
          //         {"id":71,"buy_number":18},
          //         {"id":72,"buy_number":16}
          //     ],
          //     "id_user":12
          // }
          // => l??n server forEach ra sau ???? chuy???n t??? array sang object r???i l??u v??o database 
        // => t??? nay tr??? ??i s??? l??m ntn n???u g???p ph???i vi???c c???n g???i d??? li???u ki???u n??y l??n server 
      }
    }
}
</script>

<style scoped>
#big_user_order{
  padding: 20px;
  background-color: #F0F2F5;
}
#big {
  background-color: white;
  padding: 30px 0px;
  padding-bottom: 0px;
}

.pr_infor {
  display: flex;
  align-content: center;
  align-items: center;
}
.pr_img img {
  width: 80%;
  height: 80%;
  object-fit: contain;
}
.pr_name span{
  color: #0085FF;
  font-weight: bold;
  font-size: 20px;
}
.pr_num {
  /* color: #218838; */
  color: red;
  font-weight: bold;
}
.pr_border {
  border-bottom: 2px solid #F0F2F5;
}
.total {
  font-weight: bold;
}
.total span {
  color: #218838;
  font-size: 20px;
  margin: 0px 10px;
}

/* ????ng ra l?? m???i l???n click + ho???c - l?? m???i l???n g???i t??? server l??n ????? check v?? c?? th??? trong l??c m??nh ??ang 
xem th?? admin th??m s??? l?????ng ho???c ng?????i d??ng kh??c mua h???t s??? l?????ng => nh??ng l??m v???y kh?? l?? m???t 
=> t???m th???i ch??? g???i m???t l???n khi v??o trang => sau n??y c???i thi???n sau */
</style>
