import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileModule } from './file/file.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:admin@127.0.0.1:27017/music-platform',
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    TrackModule,
    FileModule,
  ],
})
export class AppModule {}
