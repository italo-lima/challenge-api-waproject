import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { Solicitation } from 'modules/database/models/solicitation';
import { enRoles } from 'modules/database/interfaces/user';

import { SolicitationRepository } from '../repositories/solicitation';
import { SolicitationService } from '../services/solicitation';
import { IndexValidator } from '../validators/solicitation/index';
import { SaveValidator } from '../validators/solicitation/save';

@ApiTags('Admin: Solicitation')
@Controller("solicitation")
@AuthRequired([enRoles.admin])
export class SolicitationController {
  constructor(private solicitationRepository: SolicitationRepository, private solicitationService: SolicitationService) {}

  @Post()
  @ApiResponse({ status: 200, type: Solicitation })
  public async save(@Body() data: SaveValidator) {
    return this.solicitationService.save(data)
  }

  @Get(':solicitationId')
  @ApiResponse({ status: 200, type: Solicitation })
  public async show(@Param('solicitationId', ParseIntPipe) solicitationId: number) {
    return this.solicitationRepository.findById(solicitationId);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Solicitation] })
  public async index(@Query() data: IndexValidator) {

    return this.solicitationRepository.index(data)
  }

  @Delete(':solicitationId')
  public async delete(@Param('solicitationId', ParseIntPipe) solicitationId: number) {
    return this.solicitationService.remove(solicitationId)
  }
}