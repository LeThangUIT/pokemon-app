export interface Pokemon {
    id: string
    number: number
    name: string
    type_1: number
    type_2: any
    total: number
    hp: number
    attack: number
    defense: number
    sp_atk: number
    sp_def: number
    speed: number
    generation: number
    legendary: number
    created_at: Date
    updated_at: Date
}

export interface Type {
    id: number | undefined,
    name: string
}