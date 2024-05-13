import { DataSource, Repository } from 'typeorm';
import { Board } from './boards.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './boards.model';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(datasource: DataSource) {
    super(Board, datasource.createEntityManager());
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }
}
