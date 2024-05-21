import { DataSource, Repository } from 'typeorm';
import { Board } from './boards.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './boards.model';
import { User } from '../auth/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(datasource: DataSource) {
    super(Board, datasource.createEntityManager());
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });
    await this.save(board);
    return board;
  }
}
