import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from "./file/file.module";
import { TrackModule } from "./track/track.module";



@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.5jdk08p.mongodb.net/?retryWrites=true&w=majority'),
        TrackModule,
        FileModule]
})
export class AppModule { }