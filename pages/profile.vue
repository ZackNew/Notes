<script setup lang="ts">
const { supabase } = useSupabase();
const { user } = useAuth();

const notesResponse = ref();

if (process.client) {
  notesResponse.value = await supabase
    .from("notes")
    .select()
    .eq("user_id", user.value?.id);
}

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="container">
    <h3>My Notes</h3>
    <NotesForm />
    <div v-if="notesResponse.data">
      <NCard class="card" v-for="note in notesResponse.data" :key="note.id">
        <h2>{{ note.title }}</h2>
        <p>{{ note.note }}</p>
      </NCard>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 50%;
  margin: 0 auto;
  padding: 3rem 0;
  height: 93vh;
}
h3 {
  font-size: 2rem;
}
.card {
  margin-top: 1.5rem;
  padding: 1rem;
}
.card h2 {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
