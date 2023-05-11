import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Album } from 'src/album/schemas/album.schema';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  text: string;

  @Prop()
  listens: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: Types.ObjectId, ref: 'Album' })
  album: Album;
}

const trackSchema = SchemaFactory.createForClass(Track);

// trackSchema.pre('findOneAndDelete', async function (next) {
//   console.log('==============================================================');
//   // await this.model.deleteMany({ track: this.getQuery()._id });
//   const track = await this.findOne().populate('comments');

//   console.log(track.comments.deleteMany());
//   // console.log(Comment);
//   // next();
// });

export const TrackSchema = trackSchema;
