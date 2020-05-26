/**
 * %%%%%%%%%%%%%% *
 * %%% ROUTER %%% *
 * %%%%%%%%%%%%%% *
*/
/*** [IMPORT] ***/
import Vue from 'vue'
import Router from 'vue-router'

/*** [IMPORT] Personal ***/
import Admin from '../pages/admin/'
import Dashboard from '../pages/Dashboard'
import Events from '../pages/events/'
import AddEvent from '../pages/events/AddEvent'
import EditEvent from '../pages/events/EditEvent'
import AddTask from '../pages/tasks/AddTask'
import EditTask from '../pages/tasks/EditTask'
import Tasks from '../pages/tasks/'
import Register from '../pages/user/Register'
import Login from '../pages/user/Login'
import Profile from '../pages/user/Profile'
import NotFound from '../pages/404'

/*** [USE] ***/
Vue.use(Router)

/*** [EXPORT] ***/
export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Dashboard',
			component: Dashboard,
			meta: {
				auth: true,
				title: 'Dashboard'
			}
		},
		{
			path: '/admin',
			name: 'Admin',
			component: Admin,
			meta: {
				auth: true,
				title: 'Admin Dashboard'
			}
		},
		{
			path: '/events',
			name: 'Events',
			component: Events,
			meta: {
				auth: true,
				title: 'Events'
			}
		},
		{
			path: '/events/add-event',
			name: 'AddEvent',
			component: AddEvent,
			meta: {
				auth: true,
				title: 'Add Event'
			}
		},
		{
			path: '/events/edit-event/:id',
			name: 'EditEvent',
			component: EditEvent,
			meta: {
				auth: true,
				title: 'Add Event'
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				auth: true,
				title: 'Login'
			}
		},
		{
			path: '/register',
			name: 'Register',
			component: Register,
			meta: {
				auth: true,
				title: 'Register'
			}
		},
		{
			path: '/profile',
			name: 'Profile',
			component: Profile,
			meta: {
				auth: true,
				title: 'Your Profile'
			}
		},
		{
			path: '/tasks',
			name: 'Tasks',
			component: Tasks,
			meta: {
				auth: true,
				title: 'Your Tasks'
			}
		},
		{
			path: '/tasks/add-task',
			name: 'AddTask',
			component: AddTask,
			meta: {
				auth: true,
				title: 'Add a Task'
			}
		},
		{
			path: '/tasks/edit-task/:id',
			name: 'EditTask',
			component: EditTask,
			meta: {
				auth: true,
				title: 'Edit this Task'
			},
		},
		{
			path: '/**',
			name: '404',
			component: NotFound,
			meta: {
				auth: true,
				title: '404 Not Found..'
			},
		}
	]
})
