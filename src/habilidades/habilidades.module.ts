import { Module } from '@nestjs/common';
import { Habilidad } from './Habilidades.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from '../pokemons/Pokemon.entity';
import { HabilidadesService } from './habilidades.service';
import { HabilidadesController } from './habilidades.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Habilidad]),
        TypeOrmModule.forFeature([Pokemon]),
      ],
    providers: [HabilidadesService],
    controllers: [HabilidadesController],
})


export class HabilidadesModule {}
