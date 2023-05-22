<template>
  <div class="page-view">
    <RegisterView />
  </div>
</template>

<script lang="ts">
import RegisterView from "@/components/auth/RegisterView.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "LoginPage",
  components: {
    RegisterView,
  },
})
export default class extends Vue {}
</script>
