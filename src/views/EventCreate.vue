<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="submitEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>

      <h3>Name & describe your event</h3>
      <BaseInput
        class="field"
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Title"
      />

      <BaseInput
        class="field"
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Description"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        class="field"
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Location"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'

const numberSequence = length =>
  Array.apply(null, { length }).map(Number.call, Number)

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      times: numberSequence(24).map(x => x + 1 + ':00'),
      event: this.newEventObject()
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState(['categories'])
  },
  methods: {
    ...mapActions('event', ['createEvent']),
    async submitEvent() {
      try {
        NProgress.start()
        await this.createEvent(this.event)
        this.$router.push({
          name: 'event-show',
          params: { id: this.event.id }
        })
        this.event = this.newEventObject()
      } catch (error) {
        NProgress.done()
      }
    },
    newEventObject() {
      const id = Math.floor(Math.random() * 10000000)

      return {
        id,
        user: this.user,
        category: '',
        organizer: this.user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 24px;
}
</style>
