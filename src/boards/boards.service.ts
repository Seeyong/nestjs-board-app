import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }
  createBoard(createBoardDto: CreateBoardDto): Board {
    const board: Board = {
      id: uuid(),
      status: BoardStatus.PUBLIC,
      ...createBoardDto,
    };
    this.boards.push(board);
    return board;
  }
  getOneBoard(id: string): Board {
    const theBoard: Board = this.boards.find(
      (board: Board): boolean => board.id === id,
    );
    return theBoard;
  }
  deleteOneBoard(id: string): string {
    this.boards.filter((board: Board): boolean => board.id !== id);
    return id;
  }
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getOneBoard(id);
    board.status = status;
    return board;
  }
}
