import { ObjectId } from 'mongoose';

export class RemoveTracksDto {
  readonly tracksId: Array<ObjectId>;
}
