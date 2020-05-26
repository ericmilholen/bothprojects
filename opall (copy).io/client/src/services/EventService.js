/**
 * %%%%%%%%%%%%%%%%%%%%%% *
 * %%% EVENT SERVICES %%% *
 * %%%%%%%%%%%%%%%%%%%%%% *
 * Ordered by "CRRUD" first then 
 * alphabeticaly for everything 
 * else.
*/
/*** [IMPORT] ***/
import axios from 'axios'

/*** [CLASS] Event Services ***/
class EventService {
	// [CREATE] Event //
	static insertEvent(email, title, type, timeDue, dateDue, location, description) {
		return axios.post('/api/events/create', {
			email,
			title,
			type,
			timeDue,
			dateDue,
			location,
			description,
		})
	}

	// [READ ALL] Events //
	static getEvents(email) {
		// Request Event Data from Server //
		let result = new Promise ((resolve, reject) => {
			axios.get(`/api/events/read-all/${email}`)
				.then((res) => {
					const data = res.data
					resolve(
						data.map(event => ({
							...event,
							createdAt: new Date(event.createdAt)
						}))
					)
				})
				.catch((err) => { reject(err) })
		})

		// [RETURN] //
		return result
	}

	// [READ] Single Event //
	static getSingleEventData(id) {
		// Get Specific Event Data
		let result = new Promise ((resolve, reject) => {
			axios
				.get(`/api/events/read/${id}`)
				.then((res) => {
					const data = res.data
					resolve(
						data.map(event => ({
							...event,
							createdAt: new Date(event.createdAt)
						}))
					)
				})
				.catch((err)=> { reject(err) })
		})

		// [RETURN] //
		return result
	}

	// [UPDATE] Single Event //
	static updateEvent(id, title, type, timeDue, dateDue, location, description) {
		return axios.post(`/api/events/update/${id}`, {
			title,
			type,
			timeDue,
			dateDue,
			location,
			description,
		})
	}

	// [DELETE] Event //
	static deleteEvent(id) {
		return axios.delete(`/api/events/delete/${id}`)
	}
	////////////////////////// CRRUD DONE ///////////////////////////

	// [T/F] Does User Own Event //
	static eventOwnershipValidation(id, email) {
		let result = new Promise ((resolve, reject) => {
			axios.get(`/api/events/ownership-validation/${id}`, {
				params: {
					email: email
				}
			})
				.then((res) => { resolve(res) })
				.catch((err) => { reject(err) })
		})
		return result
   }
}

/*** [EXPORT] ***/
export default EventService