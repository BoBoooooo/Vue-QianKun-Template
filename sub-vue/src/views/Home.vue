<template>
  <div class="home">
    <HelloWorld msg="Sub-Vue 子应用1" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
