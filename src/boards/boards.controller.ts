import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './boards.model';
import { Board } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${user.username} creates a new board. Payload: ${JSON.stringify(createBoardDto)}`,
    );
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBaord(id, user);
  }

  @Patch(':id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Get()
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(user);
  }
}
