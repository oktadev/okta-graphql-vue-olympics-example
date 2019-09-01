<template>
  <div class="container">
    <h2>Events</h2>
    <p><label>Name:
      <input v-model="nameInput" />
    </label></p>
    <p><label>Sport:
      <input v-model="sportInput" />
    </label></p>
    <p><label>Event:
      <input v-model="eventInput" />
    </label></p>
    <p><label>Year:
      <input type="number" v-model="yearInput" />
    </label></p>
    <p><label>Medal:
      <input v-model="medalInput" >
    </label></p>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Sport</th>
          <th scope="col">Event</th>
          <th scope="col">Name</th>
          <th scope="col">Year</th>
          <th scope="col">Medal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" v-bind:key="event">
          <td>{{event.sport}}</td>
          <td>{{event.event}}</td>
          <td>{{event.name}}</td>
          <td>{{event.year}}</td>
          <td>{{event.medal}}</td>
        </tr>
      </tbody>
    </table>
    <div class="row prev-next">
      <div class="col-sm-12 col-md-6 col-lg-3" v-if="$route.params.offset && parseInt($route.params.offset)>=10">
        <router-link :to="'/olympics/' + (parseInt($route.params.offset || 0) - 10)" class="btn btn-primary">Prev</router-link>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-3">
        <router-link :to="'/olympics/' + (parseInt($route.params.offset || 0) + 10)" class="btn btn-primary">Next</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data: () => ({
    name: 'Olympics',
    nameInput: '',
    sportInput: '',
    eventInput: '',
    medalInput: '',
    yearInput: '',
    events: []
  }),
  apollo: {
    events: {
      query: gql`query Events($offset:Int, $limit: Int, $name: String, $sport: String, $event: String, $medal: String, $year: Int) {
        events(offset: $offset, limit: $limit, name: $name, sport: $sport, event: $event, medal: $medal, year: $year) {
          id, name, sport, event, year, medal
        }
      }`,
      variables() {
        return {
          offset: parseInt(this.$route.params.offset) || 0,
          limit: 10,
          name: this.nameInput,
          sport: this.sportInput,
          event: this.eventInput,
          medal: this.medalInput,
          year: this.yearInput ? parseInt(this.yearInput) : -1
        }
      },
    }
  }
}
</script>

<style scoped>
.prev-next {
  margin-bottom: 50px;
}
</style>
