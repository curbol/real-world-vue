<template>
  <div>
    <h1>Events for {{ user.name }}</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <router-link
      v-show="page !== 1"
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
      >Prev Page</router-link
    >
    <span>&nbsp;|&nbsp;</span>
    <router-link
      v-show="eventsTotalCount > page * perPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      >Next Page</router-link
    >
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState, mapActions } from 'vuex'
import store from '@/store/store'

async function getPageEvents(to, next) {
  const currentPage = parseInt(to.query.page) || 1
  await store.dispatch('event/fetchEvents', {
    page: currentPage
  })
  to.params.page = currentPage
  next()
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  computed: {
    ...mapState('event', ['events', 'eventsTotalCount', 'perPage']),
    ...mapState('user', ['user'])
  },
  methods: {
    ...mapActions('event', ['fetchEvents'])
  },
  async beforeRouteEnter(to, from, next) {
    await getPageEvents(to, next)
  },
  async beforeRouteUpdate(to, from, next) {
    await getPageEvents(to, next)
  }
}
</script>

<style lang="scss" scoped></style>
