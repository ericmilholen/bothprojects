/*** [IMPORT] ***/
import Vue from 'vue'
import Router from 'vue-router'

/*** [IMPORT] Personal ***/
import FrontPage from '../pages/FrontPage'
import Quote from '../pages/Quote'
import Stocks from '../pages/Stocks'

/*** [USE] ***/
Vue.use(Router)

/*** [EXPORT] ***/
export default new Router ({
	routes: [
		{
			path: '/',
			name: 'FrontPage',
			component: FrontPage,
			meta: {
				auth: true,
				title: 'RpTide'
			}
		},
		{
			path: '/stocks',
			name: 'Stocks',
			component: Stocks,
			meta: {
				auth: true,
				title: 'Stocks'
			}
		},
		{
			path: '/quote/:ticker',
			name: 'Quote',
			component: Quote,
			meta: {
				auth: true,
				title: 'Quote'
			}
		},
	]
})