<template>
  <div class="page-view profile-settings-page">
    <span class="header">Update Profile</span>
    <ProfileSettingsForm />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ProfileSettingsForm from "@/components/profile-settings/ProfileSettingsForm.vue";

@Component({
  name: "ProfileSettingsPage",
  components: {
    ProfileSettingsForm,
  },
})
export default class extends Vue {}
</script>

<style scoped>
.profile-settings-page {
  height: max-content;
  background: #f8fafc;
}
.header {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  color: #cbd5e1;
}
</style>
