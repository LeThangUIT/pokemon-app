<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed, ref } from 'vue';
import { Pokemon } from '../../types/pokemon';
import { getPokemonDetail } from '../../services/pokemon'
import { baseUrl } from '../../settings';

const props = defineProps<{
    modalVisible: boolean,
    id: string
}>()

const emits = defineEmits<{
    (e: 'update:modalVisible', value: boolean): void
}>()

const localVisible = computed({
    get: () => props.modalVisible,
    set: value => emits('update:modalVisible', value),
})

const pokemon = ref<Pokemon>()
const loading = ref(false)
const errorMessage = ref()
const fetchData = async () => {
    try {
        loading.value = true
        errorMessage.value = ''
        const {
            data: { data },
        } = await getPokemonDetail(props.id)
        pokemon.value = data
    } catch (error) {
        errorMessage.value = (error as Error).message
    } finally {
        loading.value = false
    }
}

</script>
<template>
    <Dialog @show="fetchData" v-model:visible="localVisible" modal :header="pokemon?.name">
       
        <img alt="user header" :src="`${baseUrl}/pokemons/${id}/sprite`" style="width: 20rem; height: auto;" />
        <div class="group" style="margin: 8px 0;">
            <label class="label">Total: </label>
            <span>{{ pokemon?.total }}</span>
        </div>
        <div class="row">
            <div class="group">
                <label class="label">Speed: </label>
                <span>{{ pokemon?.speed }}</span>
            </div>
            <div class="group">
                <label class="label">HP: </label>
                <span>{{ pokemon?.hp }}</span>
            </div>
            <div class="group">
                <label class="label">Attack: </label>
                <span>{{ pokemon?.attack }}</span>
            </div>
            <div class="group">
                <label class="label">Defense: </label>
                <span>{{ pokemon?.defense }}</span>
            </div>
            <div class="group">
                <label class="label">SP attack: </label>
                <span>{{ pokemon?.sp_atk }}</span>
            </div>
            <div class="group">
                <label class="label">SP defense: </label>
                <span>{{ pokemon?.sp_def }}</span>
            </div>
        </div>
    </Dialog>
</template>
<style scoped>
.row {
    display: grid;
    grid-template-columns: auto auto;
    gap: 8px
}

.group {
    display: flex;
    gap: 3px;
    align-items: center;
}

.label {
    font-weight: 700
}
</style>