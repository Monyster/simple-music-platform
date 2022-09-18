import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { FileModule } from "./file/file.module";
import { TrackModule } from "./track/track.module";



@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.5jdk08p.mongodb.net/?retryWrites=true&w=majority'),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, 'static'),
        }),
        TrackModule,
        FileModule]
})
export class AppModule { }