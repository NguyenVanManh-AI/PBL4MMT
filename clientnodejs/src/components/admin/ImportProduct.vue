<template>
    <div id="administrator">
        <ParticleVue32></ParticleVue32>
        <div id="big">
            <div id="head">
                <div>
                    <div><span @click="home" id="home" class="under">Pages</span> / <span class="under" @click="spwarehouse" id="spwarehouse">Warehouse Import</span>
                    / <span class="under" @click="spimportproduct" id="spimportproduct">Import Product</span></div>
                    <div style="font-weight: bold">Import Product</div>
                </div>
                <div id="search">
                    <div id="pr" @click="profile">
                        <img :src="url_img" v-if="admin.url_img!=null">
                        <img src='../../assets/avatar.png' v-if="admin.url_img==null">
                    </div>
                </div>
            </div>

            <div id="table">
                <div id="toptable">
                    <div style="color: gray;font-size: 1rem;padding-top: 10px;"><i class="fa-solid fa-dolly"></i> Import Product</div>
                </div>
                <div class="form-group row">
                    <label class="col-sm col-form-label"><i class="fa-solid fa-building-user"></i> Provider Name <span style="font-size: 10px;color: gray;">(Tip: When select press a key to search faster)</span></label>
                    <select class="custom-select custom-select-lg" v-model="provider_id" style="margin: 0px 15px">
                        <option selected value="0">Open this select menu to select Provider </option>
                        <option v-for="(provider,index) in providers" :key="index" :value="provider.id" >{{provider.name}}</option>
                    </select>
                </div>
                <div id="bodytable">
                    <div v-for="(importPro,index) in importProducts" :key="index" class="importproduct">
                        <div class="row">
                            <div class="col-12">
                                <div class="row"><label class="col-sm-6 col-form-label"># {{index+1}} - Product Name <i class="fa-solid fa-square-check"></i> </label></div>
                                <select class="custom-select custom-select-lg" v-model="importPro.product_id">
                                    <option selected value="0">Open this select menu to select Product</option>
                                    <option v-for="(product,index2) in products" :key="index2" :value="product.id" >{{product.name}}</option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="row"><label class="col col-form-label " >Quantity</label></div>
                                <div class="row"><div class="col"><input v-model="importPro.quantity" type="number" min="0" class="form-control" placeholder="Quantity (number)"></div></div>
                            </div>
                            <div class="col">
                                <div class="row"><label class="col col-form-label"><i class="fa-solid fa-dollar-sign"></i> Price</label></div>
                                <div class="row"><div class="col"><input v-model="importPro.price" type="number" min="0" class="form-control" placeholder="Price ($)"></div></div>
                            </div>
                            <div class="col">
                                <div class="row"><label class="col col-form-label"><i class="fa-solid fa-percent"></i> Tax</label></div>
                                <div class="row"><div class="col"><input v-model="importPro.tax" type="number" min="0" max="100" class="form-control" placeholder="Tax (%) . 0-100% "></div></div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-outline-danger minis" @click="minis(index)"><i class="fa-solid fa-minus"></i></button>
                    </div>     
                    <button type="submit" class="mt-4 btn-pers" @click="addImport" style="margin-left: 30px;padding:10px 16px;top:-26px"><i class="fa-solid fa-plus"></i></button>
                    <div class="dt1">
                        <button type="submit" class="mt-4 btn-pers" @click="fImportProduct" style="margin-left: 100px;top:-56px" ><i class="fa-solid fa-paper-plane"></i> Import </button>
                    </div>    
                </div>
            </div>
        </div>
        <p style="position: absolute;top:1200px;font-size: 1px;">s</p>
        <Notification></Notification>
    </div>
</template>

<script>

import BaseRequest from '../../restful/admin/core/BaseRequest';
import useEventBus from '../../composables/useEventBus'
import Notification from './Notification'
import config from '../../config.js'
// import Paginate from 'vuejs-paginate-next';

import ParticleVue32 from "./particle/ParticleVue32.vue";

export default {
    name:"ImportProduct",
    components:{
        Notification,
        ParticleVue32
        // paginate: Paginate
    },
    setup() {
      document.title = "Meta Shop - Import Product";
    },
    data(){
        return {
            url_img:'',
            products:null,
            providers:null,
            provider_id:0,
            importProducts:[
                {
                    importer_name:null,
                    product_id:0,
                    product_name:null,
                    provider_id:null,
                    provider_name:null,
                    provider_tax_id:null,
                    price:null,
                    quantity:null,
                    tax:null
                }
            ],
            import_id:0,
            index_success:0,
            admin:{
                id:null,
                fullname:'',
                username:'',
                email: '',
                phone: '',
                date_of_birth:null,
                url_img:null,
                gender:null,
                address:'',
                role:'',
                access_token:'',
                refreshToken:'',
                created_at:null,
                updated_at:null,
                email_verified_at:null,
            },
            domain:config.API_URL,
            err:{
                importer_name:[],
                product_id:[],
                product_name:[],
                provider_id:[],
                provider_name:[],
                provider_tax_id:[],
                price:[],
                quantity:[],
                tax:[]
            },
            product_success:[0,],

        }
    },
    mounted(){

        this.admin = JSON.parse(window.localStorage.getItem('admin'));
        this.url_img = config.API_URL + '/' + this.admin.url_img; 

        BaseRequest.get('api/imports/getproduct')
        .then( (data) =>{
            // console.log(data);
            this.products = data.product ;
            const { emitEvent } = useEventBus();
            emitEvent('eventSuccess','Get Product Success !');
        }) 
        .catch(error=>{
            // console.log(error);
            const { emitEvent } = useEventBus();
            emitEvent('eventError',error.response.data.message);
        })

        BaseRequest.get('api/imports/getprovider')
        .then( (data) =>{
            // console.log(data);
            this.providers = data.provider ;
            const { emitEvent } = useEventBus();
            emitEvent('eventSuccess','Get Provider Success !');
        }) 
        .catch(error=>{
            // console.log(error);
            const { emitEvent } = useEventBus();
            emitEvent('eventError',error.response.data.message);
        })

        BaseRequest.get('api/imports/idmax')
        .then((data)=>{
            this.import_id = data.id_import_max + 1;
        })
        .catch((error)=>{
            const { emitEvent } = useEventBus();
            emitEvent('eventError',error.message);
        })

    },

    methods:{

        home:function(){
            this.$router.push({name:'DashboardAdmin'});
        },
        spwarehouse:function(){
            this.$router.push({name:'WarehouseImport'});
            this.searchad='';
        },
        spimportproduct:function(){
            this.$router.push({name:'ImportProduct'});
        },
        profile:function(){
            this.$router.push({name:'ProfileAdmin'});
        },
        addImport:function(){
            var importPro = {
                    importer_name:null,
                    product_id:0,
                    product_name:null,
                    provider_id:null,
                    provider_name:null,
                    provider_tax_id:null,
                    price:null,
                    quantity:null,
                    tax:null
            }
            this.importProducts.push(importPro);
            // console.log(this.importProducts);
        },
        minis:function(index){
            this.importProducts.splice(index, 1);
        },
        fImportProduct:function(){
            if(this.provider_id == 0){
                const { emitEvent } = useEventBus();
                emitEvent('eventError','Please select Provider !');
            }
            else {

                var provider_name = '';
                var provider_tax_id = '';

                for(var n=0;n<this.providers.length;n++){
                    if(this.providers[n].id == this.provider_id) {
                        provider_name = this.providers[n].name ;
                        provider_tax_id = this.providers[n].tax_id_number;
                    }
                }
                // var ii = 0 ; 
                for(var i=0;i<this.importProducts.length;i++){
                    // ii = i ; 
                    this.importProducts[i].importer_name = this.admin.fullname;
                    this.importProducts[i].provider_id = this.provider_id;
                    this.importProducts[i].provider_name = provider_name;
                    this.importProducts[i].provider_tax_id = provider_tax_id;

                    for(var j=0;j<this.products.length;j++){
                        if(this.products[j].id == this.importProducts[i].product_id){
                            this.importProducts[i].product_name = this.products[j].name;
                        }
                    }

                    BaseRequest.post('api/imports/add?import_id='+this.import_id,this.importProducts[i])
                    .then((data)=>{
                        const { emitEvent } = useEventBus();
                        emitEvent('eventSuccess',data.message);
                        // this.product_success.push(ii); // th??m v??o m???ng c??c ph???n t??? ???? th??nh c??ng ????? sau n??y x??a 
                        // this.importProducts.splice(i, 1); // n???u th??nh c??ng th?? x??a n?? ??i 
                        // ????? l???i nh???ng c??i l???i (n???u c??)
                        setTimeout(()=>{window.location=window.location.href;}, 1500);
                    })
                    .catch((error)=>{
                        this.err = error.response.data;
                        var error2 = this.err;

                        if(error2.importer_name) this.inError(error2.importer_name);
                        if(error2.product_id) this.inError(error2.product_id);
                        if(error2.product_name) this.inError(error2.product_name);
                        if(error2.provider_id) this.inError(error2.provider_id);
                        if(error2.provider_name) this.inError(error2.provider_name);
                        if(error2.provider_tax_id) this.inError(error2.provider_tax_id);
                        if(error2.price) this.inError(error2.price);
                        if(error2.quantity) this.inError(error2.quantity);
                        if(error2.tax) this.inError(error2.tax);
                        // setTimeout(()=>{window.location=window.location.href;}, 1500);
                    })
                }
                // this.rmProduct();
            }
        },
        // rmProduct:function(){
        //     console.log(this.product_success);
        //     for(var i=0;i<this.product_success.length;i++){
        //         var index = this.product_success[i];
        //         this.importProducts.slice(index,1);
        //     }
        // },
        inError:function(er){
            const { emitEvent } = useEventBus();
            for(var i=0;i<er.length;i++) emitEvent('eventError',er[i]);
        },
    },
    watch:{
    }
}
</script>

<style scoped>
.dt1 {
    width: 100%;
    align-content: center;
    display: flex;
    justify-content: center;
}
.form-group label {
    font-weight: bold;
}
#spimportproduct{
    color: #3a9efb;
    cursor: pointer;
}
#administrator{
    background-color: #F2F4F6;
    padding: 16px 30px;
    position: relative;
}

#pr {
    line-height: 100%;
    color: #0085FF;
    align-items: center;
    display: flex;
    cursor: pointer;
    margin-left: 20px;
}
#pr img{
    object-fit: cover;
    width: 40px;
    height: 40px;
    border-radius: 20px;
}
#home {
    color: #0085FF;
    cursor: pointer;
}
/* #home:hover {
    text-decoration: underline;
} */
#spwarehouse{
    color: #3a9efb;
    cursor: pointer;
}
/* #spwarehouse:hover {
    text-decoration: underline;
} */
.under{
    position: relative;
    padding: 0px 0px;
}
.under::after{
    content: ' ';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background:#0085FF;
    transition: width 0.3s;
}
.under:hover::after {
    width: 100%;
    transition: width 0.3s;
}
#big {
    position: relative;
    background-color: white;
    border-radius: 10px;
    align-items: center;
    box-shadow: 0px 10px 10px -10px #0085FF;
    background-color: #0085FF;
    height: 80px;
    margin-top: 50px;
}
#head {
    position: absolute;
    top: -50px;
    display: flex;
    justify-content: space-between;
    padding: 10px 40px;
    margin: 10px 30px;
    background-color: white;
    box-shadow: 0px 10px 10px -10px white;
    border-radius: 10px;
    align-items: center;
    width: 93%;
}

#table {
    top: 40px;
    position: absolute;
    justify-content: space-between;
    padding: 0px 30px;
    margin: 10px 30px;
    background-color: white;
    /* box-shadow: 0px 10px 10px -10px gray; */
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    border-radius: 10px;
    align-items: center;
    width: 93%;
    font-size: 13px;
    /* border: 10px solid red; */
}


#bodytable .btn {
    font-size: 12px;
    justify-content: center;
    margin-left: 0px;
    margin-right: 0px;
}
#table .select{
    font-size: 12px;
    cursor: pointer;
}
#toptable {
    display: flex;
    padding: 30px 0px 10px 0px;
    justify-content: space-between;
    align-items: center;
}

/* btn add admin */
#add_button{
    position:absolute;
    top: 0px;
    right: 0px;
}
#add_button button{
    font-size: 22px;
    display: flex;
    line-height: 100%;
    align-items: center;
    border-radius: 15px;
}
.btn-pers {
  position: relative;
  /* left: 50%; */
  padding: 16px 16px;
  /* font-size: 12px; */
  text-transform: uppercase;
  /* letter-spacing: 2.5px; */
  font-weight: 700;
  /* color: #000; */
  color: #0085FF;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  transform: translateX(-50%);
}

.btn-pers:hover {
  background-color: #0085FF;
  box-shadow: 0px 15px 20px rgba(46, 138, 229, 0.4);
  color: #fff;
  transform: translate(-50%, -7px);
}

.btn-pers:active {
  transform: translate(-50%, -1px);
}

/* Import Product */

.importproduct{
    border: 1px solid #0085FF;
    padding: 10px 30px 15px 30px;
    margin-bottom: 20px;
    position: relative;
    background-image: linear-gradient(120deg, white 0%, #edf4fb 100%);
}
.minis{
    position: absolute;
    right:6px;
    top:6px;
}
.importproduct label {
    font-weight: bold;
}
.importproduct .btn{
    transition: all 1s ease;
} 

</style>

<!-- 
    - POST : 
        {
            "importer_name":"Nguy???n C??ng C?????ng",             // l???y t??? t??i kho???n ????ng nh???p 
            "product_id":"2",                                // l???y t??? product
            "product_name":"MacBook Air M1",                 // l???y t??? product 
            "provider_id":"4",                               // l???y t??? provider
            "provider_name":"Apple",                         // l???y t??? provider
            "provider_tax_id":"03432201594843",              // l???y t??? provider
            "price":"300999",                                // nh???p v??o 
            "quantity":"10",                                 // nh???p v??o 
            "tax":"20"                                       // nh???p v??o 
        }

        - Th??m v??o Import -> importer_name, provider_id, provider_name, provider_tax_id . import_date -> server l???y ng??y v?? gi??? hi???n t???i
        - Sau khi Import th??nh c??ng th?? sinh ra id m???i (id m???i nh???t) -> l?? import_id
        - Th??m v??o Import Details -> import_id , product_id , product_name , price , quantity , tax
        - Sau khi th??m Import Details th??nh c??ng th?? c???ng th??m quantity v??o quantity product


    - M???t m???ng importProducts s??? ch???a nhi???u importProduct
        importProduct : 
            {
                "importer_name":"Nguy???n C??ng C?????ng",          
                "product_id":"2",                               
                "product_name":"MacBook Air M1",                  
                "provider_id":"4",                               
                "provider_name":"Apple",                        
                "provider_tax_id":"03432201594843",               
                "price":"300999",                                
                "quantity":"10",                                
                "tax":"20"                                    
            }

        - M???i l???n click (+) th?? importProducts.push(importProduct) => l??c n??y length s??? t??ng l??n => v-for th?? s??? t??ng b???ng nh???p v??o l??n 
        - Khi post l??n th?? l???p qua c??c b???ng . b???ng n??o post th??nh c??ng th?? slice ph???n t??? importProduct n???m trong importProducts ???? ??i 
        - B???ng n??o l???i th?? b??o l???i 

 -->
<!-- 

    Note : 
        + Ta kh??ng n??n l??m theo ki???u search category v?? m???t thanh hi???n th??? nh?? th??? 
        => B???i v?? b???n ch???t select c???a bootstrap hay select th?????ng n?? ???? t??ch h???p s???n vi???c t??m ki???m cho ta r???i 
        => b???ng c??ch nh???p m???t ph??m b???t k?? (ch??? c??i ?????u ti??n c???a n???i dung trong option)
        <select class="custom-select custom-select-lg mb-3">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>

        => nh???n O th?? n?? ?????n One 
        => nh???n T th?? n?? ?????n Two -> Three 
        => l??? l??m b??n category r???i th?? ????? th??? c??ng ???????c => c??i kh??c kh??ng l??m th??? n???a . 

        + N???u ta ????? nh?? tr??n th?? s??? ki???n click t???ng c??i option s??? kh??ng ???????c th???c hi???n , v?? n???u ta th??m size th?? ???????c 
            <select class="custom-select custom-select-lg mb-3" size="3">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>

            => nh?? tr??n th?? n?? hi???n th??? ra m???t v??ng c?? chi???u cao l?? 3 h??ng 
            => v?? th???c hi???n ???????c s??? ki???n click option 
            => nh??ng kh??ng c??n ???????c nh?? c??i tr??n n???a 

        + Bind d??? li???u t???i select s??? kh???c ph???c ???????c nh?????c ??i???m 2 c??i tr??n , ngo??i ra c?? th??? d??ng ph??m l??n xu???ng n???a. 
            <select class="custom-select custom-select-lg mb-3" v-model="id">
                <option value="0">Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>

            => click v??o d??ng n??o th?? n?? s??? l???y option c???a d??ng ???? cho v??o id 
        
        => ta s??? bind cho seletc l?? product_id khi v-for , v?? khi kh???i t???o ph???n t??? cho m???ng th?? thu???c t??nh product_id c???a 
        ph???n t??? ???? ????? m???c ?????nh l?? 0 ????? n?? select v??o d??ng c?? value="0" ???? 

    Note : 

        data return : 
        importProducts:[
            {
                importer_name:null,
                product_id:0,
                product_name:null,
                provider_id:null,
                provider_name:null,
                provider_tax_id:null,
                price:null,
                quantity:null,
                tax:null
            }
        ],
        importProduct:{
            importer_name:null,
            product_id:0,
            product_name:null,
            provider_id:null,
            provider_name:null,
            provider_tax_id:null,
            price:null,
            quantity:null,
            tax:null
        },

        => trong mounted() ta s??? cho n?? th??m m???t b???ng ?????u ti??n ????? khi ng?????i d??ng m???i v??o ???? c?? s???n 1 c??i 
        => khi click add th?? th??m ph???n t??? v??o m???ng 
        => khi click minis th?? lo???i b??? ph???n t??? c?? index ???? ra kh???i m???ng 

        => Ta kh??ng ???????c this.importProducts.push(this.importProduct);
        => B???I V?? : ???? l?? g??n theo THAM CHI???U => c??c m???ng khi v-for ra ?????u mang gi?? tr??? nh?? nhau 
            => v?? tham chi???u n??n khi thay ?????i m???t s???n ph???m th?? c??i kh??c c??ng gi???ng h???t nh?? v???y 

        => Ta ph???i b???i t???o BI???N M???I v?? th??m v??o ????? n?? kh??ng li??n quan ?????n c??i c?? .  

            // th??m 
            addImport:function(){
                var importPro = {
                    importer_name:null,
                    product_id:0,                       // select v??o option c?? value="0"
                    product_name:null,
                    provider_id:null,
                    provider_name:null,
                    provider_tax_id:null,
                    price:null,
                    quantity:null,
                    tax:null
                }
                this.importProducts.push(importPro);
            },

            // x??a
            minis:function(index){
                this.importProducts.splice(index, 1); // lo???i b??? ph???n t??? t???i v??? tr?? index 
            },
        
            => trong mounted() c??ng t????ng t??? . 



    Note : 
    
        CH?? ?? : 
        V?? g???p tr???c tr???c ??? client n??n ta thay ?????i c??ch th???c . 

        M???I L???N NH???N N??T IMPORT 
        T???i client c?? 2 giai ??o???n  
            1. L???y ra id l???n nh???t c???a b???ng import , v?? d??? l???y ???????c id = 70 , tr??? v??? client id_import_max = 70 => 
                t????ng lai s??? c?? 71 n??n 70 + 1 = 71  
            2. Sau ???? http://127.0.0.1:8000/api/imports/add?import_id=71 
                + L???p qua t???ng ph???n t??? v?? post l??n 

            B???ng import th?? ki???m tra c?? id 71 r???i th?? kh??ng th??m n???a . 
            B???ng import_detail th?? c??? l???y tr???c ti???p import_id = 71 m?? th??m v??o . 

        Note : 
            + Ta s??? kh??ng lo l???i v?? b???ng import kh??ng x??a hay s???a g?? c??? . ch??? th??m v??o . 
            => N??n ta kh??ng lo tr?????ng h???p id = ...,60,70 => max hi???n t???i l?? 70 nh??ng x??a d??ng 70 ??i th?? c??n 60 
            => l???n sau l???i post l??n 61 => sai 
            => id max s??? m??i l?? c??? ?????nh . Ch??? c?? t??ng th??i . 


        => L???I NGAY ??? D??NG G??N GI?? TR??? M???I CHO import_id 
        => Trong .then() G??n v??o th?? ???????c , console.log ra gi?? m???i 
        nh??ng ngo??i .then() th?? v???n c??? m??i gi?? tr??? 0 n??n th??i . L??m c??ch kh??c .

        fImportProduct:function(){
            if(this.provider_id == 0){
                const { emitEvent } = useEventBus();
                emitEvent('eventError','Please select Provider !');
            }
            else {

                var provider_name = '';
                var provider_tax_id = '';

                for(var n=0;n<this.providers.length;n++){
                    if(this.providers[n].id == this.provider_id) {
                        provider_name = this.providers[n].name ;
                        provider_tax_id = this.providers[n].tax_id_number;
                    }
                }

                for(var i=0;i<this.importProducts.length;i++){
                    console.log(abcd);
                    this.importProducts[i].importer_name = this.admin.fullname;
                    this.importProducts[i].provider_id = this.provider_id;
                    this.importProducts[i].provider_name = provider_name;
                    this.importProducts[i].provider_tax_id = provider_tax_id;

                    for(var j=0;j<this.products.length;j++){
                        if(this.products[j].id == this.importProducts[i].product_id){
                            this.importProducts[i].product_name = this.products[j].name;
                        }
                    }
                    BaseRequest.post('api/imports/add?import_id='+this.import_id,this.importProducts[i])
                    .then((data)=>{
                        console.log(data);
                        if(this.import_id == 0) {
                            this.import_id = data.import_id;
                        }
                        const { emitEvent } = useEventBus();
                        emitEvent('eventSuccess',data.message);
                        console.log(i);
                        this.product_success.push(i); // th??m v??o m???ng c??c ph???n t??? ???? th??nh c??ng ????? sau n??y x??a 
                        // this.importProducts.splice(i, 1); // n???u th??nh c??ng th?? x??a n?? ??i 
                        // ????? l???i nh???ng c??i l???i (n???u c??)
                    })
                    .catch((error)=>{
                        this.err = error.response.data;
                        var error2 = this.err;

                        if(error2.importer_name) this.inError(error2.importer_name);
                        if(error2.product_id) this.inError(error2.product_id);
                        if(error2.product_name) this.inError(error2.product_name);
                        if(error2.provider_id) this.inError(error2.provider_id);
                        if(error2.provider_name) this.inError(error2.provider_name);
                        if(error2.provider_tax_id) this.inError(error2.provider_tax_id);
                        if(error2.price) this.inError(error2.price);
                        if(error2.quantity) this.inError(error2.quantity);
                        if(error2.tax) this.inError(error2.tax);
                        // setTimeout(()=>{window.location=window.location.href;}, 1500);
                    })
                }
                this.rmProduct();
            }
        }

 -->