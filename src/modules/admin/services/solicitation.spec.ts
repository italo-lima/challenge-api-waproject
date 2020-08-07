import { NotFoundException } from '@nestjs/common';

import { SolicitationRepository } from '../repositories/solicitation';
import { SolicitationService } from './solicitation';

/* eslint-disable max-len */
describe('SolicitationService', () => {
  let solicitationRepository: SolicitationRepository;
  let solicitationService: SolicitationService;

  beforeEach(async () => {
    solicitationRepository = new SolicitationRepository();

    solicitationService = new SolicitationService(solicitationRepository);
  });

  it('should be able create a new solicitation', async () => {
    jest.spyOn(solicitationRepository, 'insert').mockImplementationOnce(solicitation => Promise.resolve({ ...solicitation } as any));
 
    const solicitation = await solicitationService.save({
      name: "Teste",
      value: 10,
      description: "Teste",
      amount: 1
    })

    expect(solicitation.value).toBe(10)
  });

  it('should be able return total of solicitations', async () => {
    jest.spyOn(solicitationRepository, 'insert').mockImplementationOnce(solicitation => Promise.resolve({ ...solicitation } as any));
    jest.spyOn(solicitationRepository, 'insert').mockImplementationOnce(solicitation => Promise.resolve({ ...solicitation } as any));
    jest.spyOn(solicitationRepository, 'count').mockResolvedValueOnce(2);

    await solicitationService.save({
      name: "Teste",
      value: 10,
      description: "Teste 1",
      amount: 1
    })

    await solicitationService.save({
      name: "Teste",
      value: 2,
      description: "Teste 2",
      amount: 10
    })

    const result = await solicitationService.totalSolicitations()

    expect(result).toBe(2)
  });

  it('should be able deleting existing solicitation', async () => {
    jest.spyOn(solicitationRepository, 'insert').mockImplementationOnce(solicitation => Promise.resolve({ ...solicitation } as any));
    jest.spyOn(solicitationRepository, 'findById').mockResolvedValueOnce({id: 1} as any);
    jest.spyOn(solicitationRepository, 'remove').mockResolvedValueOnce({id: 1 } as any);

    await solicitationService.save({
      name: "Teste",
      value: 2,
      description: "Teste",
      amount: 10
    })

    const response = await solicitationService.remove(1)
    
    expect(response).not.toBeInstanceOf(NotFoundException)
  });

  it('should not be able deleting non-existing solicitation', async () => {
    jest.spyOn(solicitationRepository, 'findById').mockResolvedValueOnce(null);

    await expect(solicitationService.remove(1)).rejects.toBeInstanceOf(NotFoundException)

  });
});