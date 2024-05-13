import {
  Controller,
  Get,
  Post,
  Delete,
  // Patch,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
// import { BoardStatus } from './boards.model';
// import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardsService.deleteBaord(id);
  }

  // @Get('/')
  // getAllBoard(): Board[] {
  //  return this.boardsService.getAllBoards();
  //}
  //@Patch(':id/status')
  //updateBoardStatus(
  //  @Param('id') id: string,
  //  @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  //): Board {
  //  return this.boardsService.updateBoardStatus(id, status);
  //}
}
