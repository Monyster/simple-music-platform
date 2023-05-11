import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';
import { AddTracksDto } from './dto/add-track.dto';
import { RemoveTracksDto } from './dto/remove-track.dto';

@Controller('/albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(
    @Body() createAlbumDto: CreateAlbumDto,
    @UploadedFiles() files: { picture?: Express.Multer.File[] },
  ) {
    return this.albumService.create(createAlbumDto, files.picture[0]);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.albumService.getAll(count, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.albumService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: Types.ObjectId) {
    return this.albumService.getOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.albumService.remove(id);
  }

  // =========================== TRACK REFERENCE START ===========================
  @Post('/:id/tracks')
  addTracks(
    @Param('id') id: Types.ObjectId,
    @Body() addTracksDto: AddTracksDto,
  ) {
    return this.albumService.addTracks(id, addTracksDto);
  }

  @Delete('/:id/tracks')
  removeTracks(
    @Param('id') id: Types.ObjectId,
    @Body() removeTracksDto: RemoveTracksDto,
  ) {
    return this.albumService.removeTracks(id, removeTracksDto);
  }
  // =========================== TRACK REFERENCE END ===========================
}
