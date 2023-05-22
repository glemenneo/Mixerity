<template>
  <div class="badge">
    <p style="margin: 0px; margin-right: 8px; padding: 0px 5px">
      {{ displayName }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "BaseBadge",
})
export default class extends Vue {
  @Prop() name!: string;

  get displayName() {
    const badgeName = this.name.toUpperCase();
    return badgeName;
  }
}
</script>
<style scoped>
.badge {
  background-color: #f8fafc;
  height: 3vh;
  line-height: 3vh;
  text-align: center;
  padding: 0 5px 0 5px;
  border-radius: 6px;
  font-size: small;
  font-weight: bolder;
  color: #1e293b;
  font-family: "Inter", Helvetica, Arial, sans-serif;
}
</style>
