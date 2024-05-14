<template>
  <div class="container">
    <div class="published">
      <div class="content">

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>
<style scoped lang="scss">
.container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
}

.published {
  width: 960px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

.content {
  min-height: 725px;
  margin-left: 80px;
  margin-right: 80px;
  padding: 40px 20px 0;
  background-color: #fff;
  margin-bottom: 16px;
  text-align: center;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
</style>