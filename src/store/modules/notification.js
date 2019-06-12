export default {
  namespaced: true,

  state: {
    notifications: []
  },

  mutations: {
    push(state, notification) {
      state.notifications.push({
        ...notification,
        id: state.notifications.length
      })
    },
    delete(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationToRemove.id
      )
    }
  },
  actions: {
    add({ commit }, notification) {
      commit('push', notification)
    },
    remove({ commit }, notificationToRemove) {
      commit('delete', notificationToRemove)
    }
  }
}
