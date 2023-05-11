import { ObjectId } from 'mongoose';

export class AddTracksDto {
  readonly tracksId: Array<ObjectId>;
}
