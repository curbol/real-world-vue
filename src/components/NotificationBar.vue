<template>
  <div class="notification-bar" :class="notificationTypeclass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { clearTimeout } from 'timers'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  computed: {
    notificationTypeclass() {
      return `-text-${this.notification.type}`
    }
  },
  methods: {
    ...mapActions('notification', ['remove'])
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  }
}
</script>

<style lang="scss" scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
