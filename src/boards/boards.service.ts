import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './boards.repository';
import { Board } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number): Promise<Board> {
    const found: Board = await this.boardRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Can't find Baord by id ${id}`);
    }
    return found;
  }

  async deleteBaord(id: number): Promise<void> {
    const result: DeleteResult = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  // getAllBoards(): Board[] {
  //  return this.boards;
  //}
  //updateBoardStatus(id: string, status: BoardStatus): Board {
  // const board = this.getOneBoard(id);
  // board.status = status;
  //  return board;
  //}
}
