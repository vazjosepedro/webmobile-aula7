import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('transacoes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async cadastrar(@Body() body: any) {
    return this.appService.criar(body);
  }

  @Get()
  async obterHistoricoEMetricas() {
    return this.appService.listarComMetricas();
  }
}
