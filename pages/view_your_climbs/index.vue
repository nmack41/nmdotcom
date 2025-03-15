<template>
  <div>
    <ClimbingDashboard :isSelfService="true" />
  </div>
</template>

<script>
import ClimbingDashboard from "@/components/ClimbingDashboard.vue";

export default {
  components: {
    ClimbingDashboard,
  },
};
</script>
