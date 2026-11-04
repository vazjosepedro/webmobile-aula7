import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transacao, TransacaoSchema } from './transacao.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:senha123@cluster0.mongodb.net/investview_aula7?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: Transacao.name, schema: TransacaoSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
