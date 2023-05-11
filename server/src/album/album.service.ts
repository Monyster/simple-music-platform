import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { AddTracksDto } from './dto/add-track.dto';
import { Track } from 'src/track/schemas/track.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>,
    @InjectModel(Track.name) private trackModel: Model<Track>,
    private fileService: FileService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto, picture) {
    const picturePath = this.fileService.createFile(FileType.PICTURE, picture);
    const createdAlbum = await this.albumModel.create({
      ...createAlbumDto,
      picture: picturePath,
    });
    console.log(createdAlbum);

    return createdAlbum;
  }

  async getAll(count: number = 10, offset: number = 0): Promise<Album[]> {
    const albums = await this.albumModel.find().skip(offset).limit(count);
    return albums;
  }

  async search(query: string): Promise<Album[]> {
    const albums = await this.albumModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });

    return albums;
  }

  async getOne(id: Types.ObjectId): Promise<Album> {
    const album = await this.albumModel.findById(id).populate('tracks');
    return album;
  }

  async remove(id: Types.ObjectId) {
    const album = await this.albumModel.findByIdAndDelete(id);
    return album._id;
  }

  // =========================== TRACK REFERENCE START ===========================
  async addTracks(
    id: Types.ObjectId,
    addTracksDto: AddTracksDto,
  ): Promise<Album> {
    const { tracksId } = addTracksDto;
    const album = await this.albumModel.findById(id);

    // Getting tracks which will be added to album
    const tracks = await this.trackModel
      .find()
      .where('_id')
      .in(tracksId)
      .exec();

    // Serialize object ids to json
    const serializedAlbumTracksId = album.tracks.map((track) =>
      JSON.stringify(track['_id']),
    );

    // Serialize object ids to json
    const serializedTracksId = tracks.map((track) =>
      JSON.stringify(track['_id']),
    );

    // Check if track id is already include in album
    const hasIncludes = serializedTracksId.every((track) => {
      return serializedAlbumTracksId.includes(track);
    });

    if (hasIncludes) {
      throw new Error('Track already in album!');
    }

    album.tracks = [...album.tracks, ...tracks];
    album.save();
    return album;
  }

  async removeTracks(
    id: Types.ObjectId,
    addTracksDto: AddTracksDto,
  ): Promise<Album> {
    const { tracksId } = addTracksDto;
    const album = await this.albumModel.findById(id);

    // Getting tracks which will be added to album
    const tracksToUnRef = await this.trackModel
      .find()
      .where('_id')
      .in(tracksId)
      .exec();

    // Serialize object ids to json
    const serializedUnRefIds = tracksToUnRef.map((track) =>
      JSON.stringify(track['_id']),
    );

    // Create new array without tracksToUnRef
    const newTracks = album.tracks.filter((track) => {
      const serializedId = JSON.stringify(track);
      return !serializedUnRefIds.includes(serializedId);
    });

    album.tracks = newTracks;
    album.save();
    return album;
  }
  // =========================== TRACK REFERENCE END ===========================
}
