import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { HabilidadesModule } from './habilidades/habilidades.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads', // Carpeta donde se almacenarán los archivos subidos
      fileFilter: (req, file, callback) => {
        if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
          callback(null, true);
        } else {
          console.log('Tipo de archivo no admitido');
        }
      },
    }),
    UsersModule,
    PokemonsModule,
    HabilidadesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
