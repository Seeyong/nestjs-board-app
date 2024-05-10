import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }
  createBoard(createBoardDto: CreateBoardDto) {
    const board: Board = {
      id: uuid(),
      status: BoardStatus.PUBLIC,
      ...createBoardDto,
    };
    this.boards.push(board);
    return board;
  }
}
