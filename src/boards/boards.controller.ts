import {
  Controller,
  Get,
  Post,
  // Delete,
  // Patch,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
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

  // @Get('/')
  // getAllBoard(): Board[] {
  //  return this.boardsService.getAllBoards();
  //}

  //@Post('/')
  //@UsePipes(ValidationPipe)
  //createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //  return this.boardsService.createBoard(createBoardDto);
  // }

  //@Get(':id')
  //getOneBoard(@Param('id') id: string): Board {
  //  return this.boardsService.getOneBoard(id);
  //}
  //@Delete(':id')
  //deleteOneBoard(@Param('id') id: string): string {
  //  return this.boardsService.deleteOneBoard(id);
  // }
  //@Patch(':id/status')
  //updateBoardStatus(
  //  @Param('id') id: string,
  //  @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  //): Board {
  //  return this.boardsService.updateBoardStatus(id, status);
  //}
}
