import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import { Model } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>,
    private fileService: FileService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto, picture) {
    const picturePath = this.fileService.createFile(FileType.PICTURE, picture);
    const createdAlbum = await this.albumModel.create({
      ...createAlbumDto,
      picture: picturePath,
    });

    return createdAlbum;
  }

  findAll() {
    return `This action returns all album`;
  }

  findOne(id: number) {
    return `This action returns a #${id} album`;
  }

  update(id: number, body) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
