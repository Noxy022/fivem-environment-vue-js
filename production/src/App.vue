<script setup>
    import {ref, onMounted} from "vue"

    // exemple fivem
    onMounted(() => {

        console.log('bien monté !')
        window.addEventListener('message', (event) => {
            if (event.data.type == 'OpenMenu') {
                // event ouverture menu 
            }
        }) 

    })

</script>


<template>
</template>

 