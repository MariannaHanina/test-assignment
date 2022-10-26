<template>
  <div id="app">
    <nav>
      <router-link to="/">Trading Desk</router-link> |
      <router-link to="/transactions">Bitcoin Transactions</router-link>
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
  color: #2c3e50;
}

nav {
  padding: 20px;

  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h1 {
  margin-bottom: 30px;
  text-align: center;
}
</style>
