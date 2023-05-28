<script setup lang="ts">
const authState = ref<"login" | "signup">("login");
const showConfirmEmailMessage = ref(false);
const input = reactive({
  email: "",
  password: "",
});
const router = useRouter();

const { signUp, user, signIn, signOut, er } = useAuth();

const toggleAuthState = () => {
  if (authState.value === "login") authState.value = "signup";
  else authState.value = "login";
  er.value = "";
};

const handleSubmit = async () => {
  if (authState.value === "login") {
    await signIn({ email: input.email, password: input.password });
    if (!er.value) router.push("/profile");
  } else {
    await signUp({ email: input.email, password: input.password });
    if (!er.value) showConfirmEmailMessage.value = true;
  }
  input.email = "";
  input.password = "";
};
</script>

<template>
  <div>
    <n-card class="card">
      <div v-if="!showConfirmEmailMessage">
        <h3>{{ authState }}</h3>
        <div class="input-container">
          <input v-model="input.email" type="text" placeholder="Email..." />
          <input
            v-model="input.password"
            type="password"
            placeholder="Password..."
          />
        </div>
        <n-button @click="handleSubmit">Submit</n-button>
        <p class="error" v-if="er">{{ er }}</p>
        <p @click="toggleAuthState">
          {{
            authState === "login"
              ? "dont have an account? Create one now"
              : "Already have an account? login here"
          }}
        </p>
      </div>
      <div v-else>
        <h3>Check email for confirmation message</h3>
      </div>
    </n-card>
  </div>
</template>

<style scoped>
.card {
  padding: 1rem;
  width: 25rem;
}
.card h3 {
  font-size: 1.7rem;
}

.input-container {
  display: flex;
  flex-direction: column;
}
.input-container input {
  margin-bottom: 0.5rem;
  padding: 0.2rem;
  outline: none;
  border: 0.1rem solid rgba(0, 0, 0, 0.1);
  border-radius: 0.2rem;
}
p {
  color: rgb(71, 71, 250);
  font-size: 0.8rem;
  cursor: pointer;
}
h3 {
  text-transform: capitalize;
}
.error {
  color: rgb(255, 0, 0);
  font-size: 0.8rem;
}
</style>
