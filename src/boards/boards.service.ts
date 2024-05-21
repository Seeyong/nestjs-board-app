import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './boards.repository';
import { Board } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { DeleteResult } from 'typeorm';
import { BoardStatus } from './boards.model';
import { User } from '../auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
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

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }

  async getAllBoards(): Promise<Board[]> {
    const boards: Board[] = await this.boardRepository.find();
    return boards;
  }
}
