<template>
  <div id="app">
    <nav>
      <router-link to="/">Trading Desk</router-link> |
      <router-link to="/websocket">WebSocket</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
* {
  box-sizing: content-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
