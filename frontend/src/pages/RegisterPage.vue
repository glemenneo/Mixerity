<template>
  <div class="page-view">
    <RegisterView />
  </div>
</template>

<script lang="ts">
import RegisterView from "@/components/auth/RegisterForm.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "RegisterPage",
  components: {
    RegisterView,
  },
})
export default class extends Vue {}
</script>

<style>
.register-page {
  height: 100%;
  background: #f8fafc;
}
</style>
