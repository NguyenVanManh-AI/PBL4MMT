const axios = require('axios');
import config from '../../../config.js'
import router from './../../../router/routes' 
import useEventBus from '../../../composables/useEventBus'

let dataAdmin = window.localStorage.getItem('admin');
let admin = null;
if(dataAdmin){
	admin = JSON.parse(dataAdmin);
}

export default {
	_getHeaders(){
		let headers = {}; 
		if(admin !== null){
			headers.Authorization = 'Bearer ' + admin.access_token;
		}
		return headers;
	},

	get(url){
		return new Promise( (resolve, reject) =>{ 
			axios.get(
				config.API_URL + '/' + url  , 
				{
					headers : this._getHeaders()
				}
			)
			.then( response =>{
				resolve(response.data);
			})
			.catch( error => {
				// if(error.response.status == 404){
				// 	window.location.href = '/401';
				// }
				// if(error.response.status == 404){
				// 	window.location.href = '/404';
				// }
				// if(error.response.status == 503){
				// 	window.location.href = '/503';
				// }
				if(error.response.status == 401) this.hadleError401();
				else {
					let errors = {
						message : error.message,
						status : error.response.status
					}
					window.localStorage.setItem('error',JSON.stringify(errors));
					// router.push({name:'CompError'});
					// router.push({name:'NotFound'});
					reject(error);
				}
			})
		});
	},
	post(url,data){
		return new Promise( (resolve, reject) =>{
			axios.post(
				config.API_URL + '/' + url, 
				data,
				{
					headers : this._getHeaders()
				}
			)
			.then( response =>{
				resolve(response.data);
			})
			.catch( error => {
				if(error.response.status == 401) this.hadleError401();
				else {
					let errors = {
						message : error.message,
						status : error.response.status
					}
					window.localStorage.setItem('error',JSON.stringify(errors));
					reject(error);
				}
			})
		})
	},
	put(url,data){
		return new Promise( (resolve, reject) =>{
			axios.put(
				config.API_URL + '/' + url, 
				data,
				{
					headers : this._getHeaders()
				}
			)
			.then( response =>{
				resolve(response.data);
			})
			.catch( error => {
				if(error.response.status == 401) this.hadleError401();
				else {
					let errors = {
						message : error.message,
						status : error.response.status
					}
					window.localStorage.setItem('error',JSON.stringify(errors));
					reject(error);
				}
			})
		})
	},
	patch(url,data){
		return new Promise( (resolve, reject) =>{
			axios.patch(
				config.API_URL + '/' + url, 
				data,
				{
					headers : this._getHeaders()
				}
			)
			.then( response =>{
				resolve(response.data);
			})
			.catch( error => {
				if(error.response.status == 401) this.hadleError401();
				else {
					let errors = {
						message : error.message,
						status : error.response.status
					}
					window.localStorage.setItem('error',JSON.stringify(errors));
					reject(error);
				}
			})
		})
	},
	delete(url){
		return new Promise( (resolve, reject) =>{
			axios.delete(
				config.API_URL + '/' + url, 
				{
					headers : this._getHeaders()
				}
			)
			.then( response =>{
				resolve(response.data);
			})
			.catch( error => {
				if(error.response.status == 401) this.hadleError401();
				else {
					let errors = {
						message : error.message,
						status : error.response.status
					}
					window.localStorage.setItem('error',JSON.stringify(errors));
					reject(error);
				}
			})
		})
	},

	// Sau m???t th???i gian th?? token h???t hi???u l???c ho???c n???u nh?? ng?????i d??ng c??? g???ng hack b???ng c??ch 
	// th??m bi???n admin :{} v??o localSotage th?? c??ng v?? ??ch v?? n???u nh?? token sau th?? s??? tr??? v??? l???i 401 v?? cho v??? l???i trang login 
	// Ta kh??ng lo l??u bi???n admin t???i localStorage v?? m???i l???n RESTful ?????u c?? y??u c???u accesss_token 
	// n???u token sai th?? kh??ng l??m ???????c g?? c??? ch??nh v?? th??? ch???c ch???n ph???i ????ng nh???p m???i l??m ???????c 
	hadleError401(){
		const { emitEvent } = useEventBus();
		emitEvent('eventError401','Unauthorized 401');
		window.localStorage.removeItem('admin');

		setTimeout(()=>{
			router.push({name:"LoginAdmin"});
			window.localStorage.removeItem('error');
			window.location=window.location.href;
		}, 1500);
	}

	// hadleError401(){ ????? ntn th?? m???i l???y ???????c bi???n router ???? import c??n n???u ????? hadleError401:function() th?? kh??ng ???????c 
	// ch?? ?? l?? removeItem() ch??? kh??ng ph???i l?? remove() => tr??nh nh???m 
}

