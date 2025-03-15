<template>
  <div>
    <ClimbingDashboard :isSelfService="false" />
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
