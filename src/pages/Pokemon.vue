<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import {Pokemon, Type} from '../types/pokemon'
import {getPokemons} from '../services/pokemon'
import PokemonTable from '../components/pokemon/PokemonTable.vue';
import { PaginationConfig, SortConfig } from '../types/common';
import { DataTableSortEvent } from 'primevue/datatable';
import PokemonFilter from '../components/pokemon/PokemonFilter.vue';

const records = ref<Pokemon[]>([])
const loading = ref(false)
const errorMessage = ref()
const sortConfig = ref<SortConfig>({
  sortField: "number",
  sortOrder: 1
})
const pagination = ref<PaginationConfig>({
  page: 1,
  size: 20

})
const selectedType = ref<Type>()
watch(selectedType, () => {
  fetchData()
})

const sortValue = computed(()=> {
  const {sortField, sortOrder} = sortConfig.value
  return sortOrder === 1 ? sortField : '-' + sortField
})
const fetchData = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    const {
      data: { data, meta },
    } = await getPokemons(sortValue.value,pagination.value.page, pagination.value.size, selectedType.value?.id)
    records.value = data
    pagination.value = {page: meta?.current_page ?? 1, size: meta?.per_page ?? 20, total: meta?.total}
  } catch (error) {
    errorMessage.value = (error as Error).message
  } finally {
    loading.value = false
  }
}

const updateSortConfig = (data: DataTableSortEvent) => {
    sortConfig.value = {
      sortField: data.sortField as string,
      sortOrder: data.sortOrder
    }
    fetchData()
}
const updatePagination = () => {
  fetchData()
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <div style="font-size: large; font-weight: 600;">Pokemon: {{ pagination?.total }}</div>
      <PokemonFilter v-model="selectedType">
      </PokemonFilter>
    </div>
    <PokemonTable 
      v-if="!errorMessage"
      v-model:records="records" 
      v-model:loading="loading" 
      v-model:sortConfig="sortConfig"
      v-model:paginationConfig="pagination"
      @update:sortConfig="updateSortConfig"
      @update:paginationConfig="updatePagination"
    ></PokemonTable>
    <div v-else style="color: red;">{{ errorMessage }}</div>
</template>

<style scoped>
    
</style>
