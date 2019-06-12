import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [
      { id: 1, title: '...', organizer: '...' },
      { id: 2, title: '...', organizer: '...' },
      { id: 3, title: '...', organizer: '...' },
      { id: 4, title: '...', organizer: '...' }
    ],
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
    async createEvent({ commit }, event) {
      await EventService.postEvent(event)
      commit('addEvent', event)
    },
    async fetchEvents({ commit }, { perPage, page }) {
      try {
        const response = await EventService.getEvents(perPage, page)
        const eventsTotalCount = +response.headers['x-total-count']
        commit('setEventsTotalCount', eventsTotalCount)
        commit('setEvents', response.data)
      } catch (error) {
        console.log('There was an error:' + error.response)
      }
    },
    async fetchEvent({ commit, getters }, id) {
      try {
        const event =
          getters.getEventById(id) || (await EventService.getEvent(id).data)
        commit('setEvent', event)
      } catch (error) {
        console.log('There was an error:', error.response)
      }
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
