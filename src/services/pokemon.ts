import { baseUrl } from "../settings"
import { ApiResponse } from "../types/common"
import { Pokemon, Type } from "../types/pokemon"

import instance from "./client/instance"

export const getPokemons = (sortValue: string,pageNum: number, pageSize: number, type?: number): Promise<ApiResponse<Pokemon[]>> => {
    let url = `${baseUrl}/pokemons?page[number]=${pageNum}&page[size]=${pageSize}&sort=${sortValue}`
    if (type !== undefined) {
        url += `&filter[type]=${type}`;
      }
    return instance.get(url)
}

export const getTypes = (): Promise<ApiResponse<Type[]>> => {
    return instance.get(`${baseUrl}/types`)
}

export const getPokemonDetail = (id: string) :Promise<ApiResponse<Pokemon>> => {
    return instance.get(`${baseUrl}/pokemons/${id}`)
}