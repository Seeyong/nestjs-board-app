import { Injectable, NotFoundException } from '@nestjs/common';
// import { BoardStatus } from './boards.model';
// import { v1 as uuid } from 'uuid';
// import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getBoardById(id: number): Promise<Board> {
    const found: Board = await this.boardRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Can't find Baord by id ${id}`);
    }
    return found;
  }
  // private boards: Board[] = [];

  // getAllBoards(): Board[] {
  //  return this.boards;
  //}
  //createBoard(createBoardDto: CreateBoardDto): Board {
  // const board: Board = {
  //   id: uuid(),
  //   status: BoardStatus.PUBLIC,
  //   ...createBoardDto,
  // };
  // this.boards.push(board);
  // return board;
  //}
  //getOneBoard(id: string): Board {
  // const theBoard: Board = this.boards.find(
  //  (board: Board): boolean => board.id === id,
  //);
  //if (!theBoard) {
  //  throw new NotFoundException(`Can't Find Board with id ${id}`);
  // }
  // return theBoard;
  //}
  //deleteOneBoard(id: string): string {
  //  const found: Board = this.getOneBoard(id);
  //  this.boards.filter((board: Board): boolean => board.id !== found.id);
  // return id;
  //}
  //updateBoardStatus(id: string, status: BoardStatus): Board {
  // const board = this.getOneBoard(id);
  // board.status = status;
  //  return board;
  //}
}
