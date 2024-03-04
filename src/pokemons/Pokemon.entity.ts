import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Habilidad } from "../habilidades/Habilidades.entity";


@Entity({name: 'pokemons'})

export class  Pokemon {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    tipo: string;

    
    @ManyToMany(() => Habilidad, habilidad => habilidad.pokemons)
    @JoinTable()
    habilidades: Habilidad[];

    @Column()
    Peso: number;

    @Column()
    imagen: string;

}