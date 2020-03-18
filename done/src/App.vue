<template>
  <div id="app">
    <header id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/add-meeting">Add meeting</router-link>
    </header>

    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 2px 5px 2px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

#nav a {
  font-weight: bold;
  color: #42b983;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #2c3e50;
  text-decoration: underline;
}
</style>
