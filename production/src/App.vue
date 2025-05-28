<script setup>
    import {ref, onMounted} from "vue"

    import imgNUI from "./components/default/img.vue" // image nui 

    // exemple fivem
    onMounted(() => {

        window.addEventListener('message', (event) => {
            if (event.data.type == 'OpenMenu') {
                // event ouverture menu 
            }
        }) 

    })

</script>



<template>
</template>
