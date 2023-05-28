<script setup lang="ts">
const { signOut, isLoggedIn } = useAuth();
</script>

<template>
  <nav>
    <ul>
      <li><nuxt-link to="/">Home</nuxt-link></li>
      <li><nuxt-link to="/profile">My Profile</nuxt-link></li>
      <li v-if="isLoggedIn()" @click="signOut" class="logout">Logout</li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: black;
  height: 7vh;
}
ul {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 2rem;
}
li {
  color: white;
  margin-right: 1rem;
}
.logout {
  margin-left: auto;
  cursor: pointer;
}
</style>
