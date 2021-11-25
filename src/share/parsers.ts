import { Song } from './interfaces';
import path from 'path';
import * as mm from 'music-metadata';
export class FilesParser {
  static async getFileMetadata(file: string): Promise<Song> {
    const parsedMetadata = await mm.parseFile(file);

    return {
      file,
      artist: parsedMetadata.common.artist ?? 'Unknown Artist',
      name: parsedMetadata.common.title ?? path.basename(file).trim(),
      album: parsedMetadata.common.album ?? 'Unknown Album',
      image: parsedMetadata.common.picture
        ? `data:${parsedMetadata.common.picture[0].format};base64,${parsedMetadata.common.picture[0].data.toString(
            'base64'
          )}`
        : undefined,
    };
  }
}
