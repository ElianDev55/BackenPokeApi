import { Controller } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/Pokemons.dto';
import { Body, Get, Post, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { UpdatePokemonDto } from './dto/Pokemons.dto';
import { Pokemon } from './Pokemon.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { Multer } from 'multer';
import { Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('pokemons')

export class PokemonsController {
    
        constructor(private pokemonsService: PokemonsService) {}
    
        @Get()
        @UseGuards(AuthGuard)
        getAllPokemons() {
            return this.pokemonsService.GetAllPokemons();
        }
    
        @Post()
        
        @UseGuards(AuthGuard)
        @UseInterceptors(FileInterceptor('imagen'))
        async create(@UploadedFile() imagen, @Body() pokemonData: CreatePokemonDto): Promise<Pokemon> {
            const pokemon = await this.pokemonsService.CreatePokemon(pokemonData, imagen);
            console.log(imagen);
          return pokemon;
        }
    
        @Get('/search')
        
        @UseGuards(AuthGuard)
        searchPokemons(@Query('name') name: string): Promise<Pokemon[]> {
            return this.pokemonsService.searchPokemonsByName(name);
        }
    
         
        @Get(':id')
        @UseGuards(AuthGuard)
        getPokemonById(@Param('id', ParseIntPipe) id: number) {
            return this.pokemonsService.GetPokemonById(id);
        }
    
        @Patch(':id')
        
        @UseGuards(AuthGuard)
        updatePokemon(@Param('id', ParseIntPipe) id: number, @Body() pokemon: Partial<UpdatePokemonDto>) {
            return this.pokemonsService.UpdatePokemon(id, pokemon);
        }
    
        @Delete(':id')
        @UseGuards(AuthGuard)
        deletePokemon(@Param('id', ParseIntPipe) id: number) {
            return this.pokemonsService.DeletePokemon(id);
        }


        @Get('/filter/type/:type')
        
        @UseGuards(AuthGuard)
        filterPokemonsByType(@Param('type') type: string): Promise<Pokemon[]> {
            return this.pokemonsService.filterPokemonsByType(type);
        }
    
        @Get('/filter/ability/:ability')
        
        @UseGuards(AuthGuard)
        filterPokemonsByAbility(@Param('ability') ability: string): Promise<Pokemon[]> {
            return this.pokemonsService.filterPokemonsByAbility(ability);
        }

}
