<template>
  <div class="page-view">
    <LoginView />
  </div>
</template>

<script lang="ts">
import LoginView from "@/components/auth/LoginView.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "LoginPage",
  components: {
    LoginView,
  },
})
export default class extends Vue {}
</script>
