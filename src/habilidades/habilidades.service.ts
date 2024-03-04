import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habilidad } from './Habilidades.entity';
import { Pokemon } from '../pokemons/Pokemon.entity';


@Injectable()
export class HabilidadesService {
    constructor(
        @InjectRepository(Habilidad)
        private habilidadRepository: Repository<Habilidad>,
        @InjectRepository(Pokemon)
        private pokemonRepository: Repository<Pokemon>,
    ) {}

     
    async createHabilidad(habilidadData: Partial<Habilidad>): Promise<Habilidad> {
        const habilidad = this.habilidadRepository.create(habilidadData);
        return this.habilidadRepository.save(habilidad);
    }

    async getHabilidades(): Promise<Habilidad[]> {
        return this.habilidadRepository.find();
    }

    async getHabilidadById(id: number): Promise<Habilidad> {
        return this.habilidadRepository.findOne({ where: { id: id } });
    }

    async updateHabilidad(id: number, habilidadData: Partial<Habilidad>): Promise<Habilidad> {
        await this.habilidadRepository.update(id, habilidadData);
        return this.habilidadRepository.findOne({ where: { id: id } });
    }

    async deleteHabilidad(id: number): Promise<void> {
        await this.habilidadRepository.delete(id);
    }

}