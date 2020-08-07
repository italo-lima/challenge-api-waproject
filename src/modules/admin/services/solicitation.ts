import { Injectable, NotFoundException } from '@nestjs/common';
import { ISolicitation } from 'modules/database/interfaces/solicitation';
import { Solicitation } from 'modules/database/models/solicitation';

import { SolicitationRepository } from '../repositories/solicitation';

@Injectable()
export class SolicitationService {
  constructor(private solicitationRepository: SolicitationRepository) {}

  private async create(data: ISolicitation): Promise<Solicitation> {
    const solicitation = await this.solicitationRepository.insert(data);
    return solicitation;
  }

  public async save(data: ISolicitation): Promise<Solicitation> {
    return this.create(data);
  }

  public async totalSolicitations(): Promise<Number> {
    return await this.solicitationRepository.count();
  }

  public async remove(solicitationId: number): Promise<void> {
    const solicitation = await this.solicitationRepository.findById(solicitationId);

    if (!solicitation) {
      throw new NotFoundException('not-found');
    }

    return this.solicitationRepository.remove(solicitationId);
  }
}