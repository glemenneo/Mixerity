<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "FollowersList",
})
export default class extends Vue {
  followers = {};
}
</script>
