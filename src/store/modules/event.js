import EventService from '@/services/EventService.js'

export default {
  namespaced: true,

  state: {
    events: [],
    eventsTotalCount: 0,
    event: {}
  },

  mutations: {
    addEvent(state, event) {
      state.events.push(event)
    },
    setEvents(state, events) {
      state.events = events
    },
    setEventsTotalCount(state, count) {
      state.eventsTotalCount = count
    },
    setEvent(state, event) {
      state.event = event
    }
  },

  actions: {
    async createEvent({ commit, dispatch }, event) {
      try {
        await EventService.postEvent(event)
        commit('addEvent', event)

        const notification = {
          type: 'success',
          message: `Your event has been created!`
        }
        dispatch('notification/add', notification, { root: true })
      } catch (error) {
        const notification = {
          type: 'error',
          message: `There was a problem creating your event: ${error.message}`
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      }
    },
    async fetchEvents({ commit, dispatch }, { perPage, page }) {
      try {
        const response = await EventService.getEvents(perPage, page)
        const eventsTotalCount = +response.headers['x-total-count']
        commit('setEventsTotalCount', eventsTotalCount)
        commit('setEvents', response.data)
      } catch (error) {
        const notification = {
          type: 'error',
          message: `There was a problem fetching events: ${error.message}`
        }
        dispatch('notification/add', notification, { root: true })
      }
    },
    async fetchEvent({ commit, getters, dispatch }, id) {
      try {
        const event =
          getters.getEventById(id) || (await EventService.getEvent(id).data)
        commit('setEvent', event)
      } catch (error) {
        const notification = {
          type: 'error',
          message: `There was a problem fetching event: ${error.message}`
        }
        dispatch('notification/add', notification, { root: true })
      }
    }
  },

  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
}
