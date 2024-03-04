

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Pokemon } from '../pokemons/Pokemon.entity';

@Entity({ name: 'habilidades' })
export class Habilidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Pokemon, pokemon => pokemon.habilidades)
  @JoinTable()
  pokemons: Pokemon[];
}
