import { Module } from '@nestjs/common';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from './Pokemon.entity';
import { Habilidad } from '../habilidades/Habilidades.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    TypeOrmModule.forFeature([Habilidad])
  ],
  controllers: [PokemonsController],
  providers: [PokemonsService]
})
export class PokemonsModule {}
