<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-light bg-light">
      <router-link class="navbar-brand" to="/">
        <i class="fa fa-trophy"></i>
      </router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="navbar-brand" to="/">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/olympics">
            Olympics
          </router-link>
        </li>
      </ul>
      <span>
        <button class="btn btn-primary" v-if="!isAuthenticated" v-on:click="login"> Login </button>
        <button class="btn btn-primary" v-else v-on:click="logout"> Logout </button>
      </span>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  data: () => ({
    authenticated: () => { return false; },
  }),
  computed: {
    isAuthenticated: function () {
      return this.$data.authenticated
    }
  },
  created () {
    this.$data.authenticated = this.$auth.isAuthenticated()
  },
  watch: {
    '$route': 'authenticated'
  },
  methods: {
    login () {
      this.$auth.loginRedirect('/')
    },
    async logout () {
      await this.$auth.logout()
      this.$data.authenticated = await this.$auth.isAuthenticated()

      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Ubuntu', sans-serif;
}
</style>
