<template>
  <div class="page-view">
    <LoginView />
  </div>
</template>

<script lang="ts">
import LoginView from "@/components/auth/LoginForm.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "LoginPage",
  components: {
    LoginView,
  },
})
export default class extends Vue {}
</script>
