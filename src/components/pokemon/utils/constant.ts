import { TableConfig } from "../../../types/common";

export const columns: TableConfig[] = [
    {field: "number" , header: "Number", sort: true},
    {field: "name" , header: "Name"},
    {field: "type_1" , header: "Type 1", props: {style: {minWidth: '75px'}}},
    {field: "type_2" , header: "Type 2", props: {style: {minWidth: '75px'}}},
    {field: "total" , header: "Total", sort: true},
    {field: "hp" , header: "HP", sort: true},
    {field: "attack" , header: "Attack", sort: true},
    {field: "defense" , header: "Defense", sort: true},
    {field: "sp_atk" , header: "SP attack", sort: true, props: {style: {minWidth: '120px'}}},
    {field: "sp_def" , header: "SP defense", sort: true, props: {style: {minWidth: '125px'}}},
    {field: "speed" , header: "Speed", sort: true},
    {field: "generation" , header: "Generation"},
    {field: "legendary" , header: "Legendary"},
    {field: "created_at" , header: "Created at", sort: true, props: {style: {minWidth: '120px'}}},
    {field: "updated_at" , header: "Updated at", sort: true, props: {style: {minWidth: '120px'}}},
    {field: "detail" , header: "Detail", props: {frozen: true}},
]