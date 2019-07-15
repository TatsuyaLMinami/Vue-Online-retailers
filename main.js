import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Routers from "./router";
import App from "./app.vue";
import "./style.css";
import product_data from "./product.js";

Vue.use(VueRouter);
Vue.use(Vuex);
//路由配置
const RouterConfig = {
	//使用HTML5的History模式
	mode:"history",
	routes:Routers,
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to,from,next) => {
	window.document.title = to.meta.title;
	next();
});
router.afterEach((to,from,next) => {
	window.scrollTo(0,0);
});

const store = new Vuex.Store({
	state:{
		//商品列表数据
		productList:[],
		//购物车数据
		cartList:[],
		
	},
	getters:{
		//用map将brand和color从productList中过滤出来
		brands:state => {
			const brands = state.productList.map(item => item.brand);
			return getFilterArray(brands);
		},
		colors:state => {
			const colors = state.productList.map(item => item.color);
			return getFilterArray(colors);
		}
	},
	//修改状态
	mutations:{
		//添加商品列表
		setProductList(state,data){
			state.productList = data;
		},
		//添加到购物车
		/*addToCart(state,id){
			const isAdded = state.cartList.find(item => item.id ===id);
			if(isAdded){
				return;
			}else{
				state.cartList.push({
					id:id,
					count:1
				})
			}
		},*/
		//商品页面 添加到购物车
		addCart(state,id){
			const isAdded = state.cartList.find(item => item.id ===id);
			if(isAdded){
				return;
			}else{
				state.cartList.push({
					id:id,
					count:1
				})
			}
		},
		//修改商品数量
		editCartCount(state,payload){
			const product = state.cartList.find(item => item.id === payload.id);
			product.count += payload.count;
			//console.log(product);
		},
		//删除商品
		deleteCart(state,id){
			const index = state.cartList.findIndex(item => item.id === id);
			state.cartList.splice(index,1);
		},
		emptyCart(state){
			state.cartList = [];
		}
		
	},
	actions:{
		//请求商品列表
		getProductList(context){
			//真实环境通过ajax获取，这里用异步实现
			setTimeout(()=>{
				context.commit("setProductList",product_data);
			},500);
		},
		//购买
		buy(context){
			return new Promise(resolve => {
				setTimeout(() => {
					context.commit("emptyCart");
					resolve();
				},500)
			});
		}
	}
});
//数组重排
function getFilterArray(array){
	const res = [];
	const json = {};
	for(let i=0; i<array.length; i++){
		const _self = array[i];
		if(!json[_self]){
			res.push(_self);
			json[_self] = 1;
		}
	}
	return res;
}

//创建Vue实例
new Vue({
	el:"#app",
	router:router,
	store:store,
	//箭头函数等同于function(h){return h(App)}
	render: h =>{
		return h(App)
	}
});
