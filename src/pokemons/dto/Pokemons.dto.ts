export class CreatePokemonDto {
    name: string;
    tipo: string;
    habilidades: number[];// IDs de las habilidades
    Peso: number;
    imagen: string;
}

export class UpdatePokemonDto {
    name?: string;
    tipo?: string;// IDs de las habilidades
    Peso?: number;
    imagen?: string;
}