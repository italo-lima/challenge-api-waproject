import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { ISolicitation } from 'modules/database/interfaces/solicitation';
import { Solicitation } from 'modules/database/models/solicitation';
import { Page, Transaction } from 'objection';

@Injectable()
export class SolicitationRepository {
  public async insert(model: ISolicitation, transaction?: Transaction): Promise<Solicitation> {
    return Solicitation.query(transaction).insert(model);
  }

  public async index(params: IPaginationParams, transaction?: Transaction): Promise<Page<Solicitation>> {
    let query = Solicitation.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
        query = query.orderBy(params.orderBy, params.orderDirection);
    }

    return query;
  }

  public async findById(id: number, transaction?: Transaction): Promise<Solicitation> {
    return Solicitation.query(transaction)
      .where({ id })
      .first();
  }

  public async count(transaction?: Transaction): Promise<Number> {
    const result: any = await Solicitation.query(transaction)
      .count('id as count')
      .first();

    return Number(result.count);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await Solicitation.query(transaction)
      .del()
      .where({ id });
  }
}