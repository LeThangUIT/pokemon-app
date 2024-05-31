<script setup lang="ts">
import DataTable, {  DataTableSortEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import { Pokemon } from '../../types/pokemon'
import { columns } from './utils/constant';
import { formatDate } from '../../helpers'
import { computed, ref } from 'vue';
import { PaginationConfig, SortConfig } from '../../types/common';
import Button from 'primevue/button';
import PokemonModal from './PokemonModal.vue';
import Paginator, { PageState } from 'primevue/paginator';

const props = defineProps<{
    records: Pokemon[]
    loading?: boolean
    sortConfig: SortConfig
    paginationConfig: PaginationConfig
}>()

const emits = defineEmits<{
    (e: 'update:records', value: Pokemon[]): void
    (e: 'update:loading', value: boolean): void
    (e: 'update:sortConfig', value: DataTableSortEvent): void
    (e: 'update:paginationConfig', value: PaginationConfig): void
}>()

const localLoading = computed({
    get: () => props.loading,
    set: value => emits('update:loading', value),
})

const modalVisible = ref<boolean>(false)
const selectedPokemon = ref<string>('')

const handleSort = (data: DataTableSortEvent) => {
    emits('update:sortConfig', data)
}
const updatePage = (e: PageState) => {
    emits('update:paginationConfig', { page: e.page + 1, size: e.rows})
}
const showModal = (id: string) => {
    modalVisible.value = true;
    selectedPokemon.value = id
}
</script>
<template>
    <DataTable  :value="props.records" :loading="localLoading" scrollable
         @sort="handleSort" class="table">
        <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header" :sortable="col.sort"
            :frozen="col.props?.frozen" alignFrozen="right" :style="[col.props?.style]">
            <template #body="{ data }: { data: Pokemon }">
                <div v-if="data[col.field as keyof Pokemon] !== null">
                    <div v-if="col.field == 'created_at'">{{ formatDate(data.created_at) }}</div>
                    <div v-else-if="col.field == 'updated_at'">{{ formatDate(data.updated_at) }}</div>
                    <div v-else-if="col.field == 'detail'">
                        <Button label="Show" @click="() => showModal(data.id)" />
                    </div>
                    <div v-else>
                        {{ data[col.field as keyof Pokemon] }}
                    </div>
                </div>
                <div v-else>--</div>
            </template>
        </Column>
    </DataTable>
    <Paginator :page="paginationConfig.page" :rows="paginationConfig.size" :total-records="paginationConfig.total" :rowsPerPageOptions="[10, 20, 30]" @page="updatePage"></Paginator>
    <PokemonModal v-model:modalVisible="modalVisible" :id="selectedPokemon"></PokemonModal>

</template>
<style scoped>
.table {
    overflow-x: auto;
    width: 100%;
}
</style>