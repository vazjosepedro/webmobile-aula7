import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao, TransacaoDocument } from './transacao.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Transacao.name)
    private transacaoModel: Model<TransacaoDocument>,
  ) {}

  async criar(data: any): Promise<Transacao> {
    const novaTransacao = new this.transacaoModel(data);
    return novaTransacao.save();
  }

  async listarComMetricas() {
    const historico = await this.transacaoModel.find().exec();

    let totalReceitas = 0;
    let totalDespesas = 0;
    let totalGastoImpulso = 0;

    historico.forEach((item) => {
      if (item.tipo === 'receita') {
        totalReceitas += item.valor;
      } else if (item.tipo === 'despesa') {
        totalDespesas += item.valor;
        if (item.consumoConsciente === false) {
          totalGastoImpulso += item.valor;
        }
      }
    });

    const saldoTotal = totalReceitas - totalDespesas;

    return {
      historico,
      metricas: {
        saldoTotal,
        totalDespesas,
        totalGastoImpulso,
      },
    };
  }
}
