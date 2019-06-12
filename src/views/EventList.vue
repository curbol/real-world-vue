<template>
  <div>
    <h1>Events Listing</h1>
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
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      perPage: 3
    }
  },
  computed: {
    page() {
      console.log()
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['events', 'eventsTotalCount'])
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: this.perPage,
      page: this.page
    })
  }
}
</script>

<style lang="scss" scoped></style>
