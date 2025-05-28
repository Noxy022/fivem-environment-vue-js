<script setup>
    const props = defineProps(['src', 'alt'])
</script>



<template>
    <img :src="`.${src}`" :alt="alt || ''">
</template>