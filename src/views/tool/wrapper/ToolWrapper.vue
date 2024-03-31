<template>
  <component :is="currentComponent"></component>
</template>
<script setup lang="ts">
import { shallowRef  } from 'vue'
import { useRoute } from "vue-router";
const route = useRoute()
const currentComponent = shallowRef()

const loadComponent = () => {
  const url = route.path
  let pk = url.split("/")
  import((`@/views/tool/pages/${pk[2]}/${pk[3]}.vue`)).then(res => {
    currentComponent.value = res.default
  }).catch(err => {
    console.log("Failed to load component:", err)
  })
}
loadComponent()
</script>


<style scoped lang="scss">

</style>
