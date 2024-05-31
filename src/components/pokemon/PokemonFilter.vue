<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTypes } from '../../services/pokemon';
import { Type } from '../../types/pokemon';
import Dropdown from 'primevue/dropdown';

const loading = ref(false)
const errorMessage = ref()
const types = ref<Type[]>([])
const selectedType = defineModel()

const fetchData = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    const {
      data: { data },
    } = await getTypes()
    types.value = [{id: undefined, name: 'All'}, ...data]
  } catch (error) {
    errorMessage.value = (error as Error).message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
    fetchData()
})
</script>
<template>
    <Dropdown v-if="loading" placeholder="Loading..." loading class="w-full md:w-14rem"></Dropdown>
    <Dropdown v-else v-model="selectedType" :options="types" optionLabel="name" placeholder="Select a type" class="w-full md:w-14rem" />
</template>
<style scoped>
</style>