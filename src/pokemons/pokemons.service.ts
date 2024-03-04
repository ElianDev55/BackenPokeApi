import { Injectable } from '@nestjs/common';
import { Pokemon } from './Pokemon.entity';
import { CreatePokemonDto } from './dto/Pokemons.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePokemonDto } from './dto/Pokemons.dto';
import { Habilidad } from '../habilidades/Habilidades.entity';
import { ILike } from 'typeorm';




@Injectable()


export class PokemonsService {

    constructor(@InjectRepository(Pokemon) private PokemonRespository: Repository <Pokemon>,
    @InjectRepository(Habilidad) private HabilidadRepository: Repository<Habilidad>
    
    ) {}
    

    

    async CreatePokemon(createPokemonDto: CreatePokemonDto, imagen: any): Promise<Pokemon> {
        const pokemon = new Pokemon();
        pokemon.name = createPokemonDto.name;
        pokemon.tipo = createPokemonDto.tipo;
        pokemon.Peso = createPokemonDto.Peso;
        pokemon.imagen = imagen.path
        // Cargar habilidades desde la base de datos según los IDs proporcionados
        const habilidades = await this.HabilidadRepository.findByIds(createPokemonDto.habilidades);
        pokemon.habilidades = habilidades;

        // Asignar la ruta de la imagen al campo correspondiente
        // Aquí debes agregar la lógica para guardar la imagen en el sistema de archivos o en la base de datos según tus necesidades
        // pokemon.imagen = 'ruta/del/archivo'; 
        
        // Guardar el pokémon en la base de datos
        return await this.PokemonRespository.save(pokemon);
    }

    async GetAllPokemons() {
        return this.PokemonRespository.find({ relations: ['habilidades'] });
    }

    GetPokemonById(id: number) {
        return this.PokemonRespository.findOne({
            where: { id }
        });
    }

    DeletePokemon(id: number) {
        return this.PokemonRespository.delete({id});
    }

    UpdatePokemon(id: number, Pokemon: Partial<UpdatePokemonDto>) {
        return this.PokemonRespository.update({id}, Pokemon);
    }

    searchPokemonsByName(name: string) {
        return this.PokemonRespository.find({
            where: { name: ILike(`%${name}%`) }
        });
    }

    async filterPokemonsByType(type: string) {
        return this.PokemonRespository.find({
            where: { tipo: type }
        });
    }

    async filterPokemonsByAbility(ability: string) {
        const habilidad = await this.HabilidadRepository.findOne({ where: { name: ability } });
        if (!habilidad) {
            return [];
        }

        return this.PokemonRespository.createQueryBuilder('pokemon')
            .leftJoinAndSelect('pokemon.habilidades', 'habilidades')
            .where('habilidades.id = :id', { id: habilidad.id })
            .getMany();
    }

}
