import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  AUDIO = 'audio',
  PICTURE = 'picture',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file): string {
    try {
      //Получение названия файла, деление его в массив, получение последней строки - расширение файла
      const fileExtension = file.originalname.split('.').pop();
      // Создание уникального имени файла
      const fileName = uuid.v4() + '.' + fileExtension;
      // Создание конечного пути хранения файла
      const filePath = path.resolve(__dirname, '..', 'static', type);
      //Проверка пути на существовании папки
      if (!fs.existsSync(filePath)) {
        // Создать папку
        fs.mkdirSync(filePath, { recursive: true });
      }
      // Создать и записать файл по пути из буффера
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(filename: string) {
    return;
  }
}
