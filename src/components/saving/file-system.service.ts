import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export default class FileSystemService {
   private readonly fileName: string;

   constructor(key: string) {
      this.fileName = key + '.save';
   }

   async read(): Promise<string> {
      if (!(await this.check())) return '';

      const result = await Filesystem.readFile({
         path: this.fileName,
         directory: Directory.Data,
         encoding: Encoding.UTF8,
      });
      return result.data;
   }

   private async check(): Promise<boolean> {
      const dir = await Filesystem.readdir({ path: '', directory: Directory.Data });
      return dir.files.filter((x) => x.name === this.fileName).length > 0;
   }

   async save(value: string): Promise<void> {
      await Filesystem.writeFile({
         path: this.fileName,
         data: value,
         directory: Directory.Data,
         encoding: Encoding.UTF8,
      });
   }

   async delete() {
      await Filesystem.deleteFile({ path: this.fileName, directory: Directory.Data });
   }
}
