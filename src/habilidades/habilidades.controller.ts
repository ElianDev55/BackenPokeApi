import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { HabilidadesService } from './habilidades.service';
import { Habilidad } from './habilidades.entity';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UseGuards } from '@nestjs/common';


@Controller('habilidades')
export class HabilidadesController {
    constructor(private habilidadesService: HabilidadesService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getAllHabilidades(): Promise<Habilidad[]> {
        return this.habilidadesService.getHabilidades();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getHabilidadById(@Param('id') id: number): Promise<Habilidad> {
        return this.habilidadesService.getHabilidadById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createHabilidad(@Body() habilidad: Habilidad): Promise<Habilidad> {
        return this.habilidadesService.createHabilidad(habilidad);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateHabilidad(
        @Param('id') id: number,
        @Body() habilidad: Habilidad,
    ): Promise<Habilidad> {
        return this.habilidadesService.updateHabilidad(id, habilidad);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteHabilidad(@Param('id') id: number): Promise<void> {
        return this.habilidadesService.deleteHabilidad(id);
    }
}
