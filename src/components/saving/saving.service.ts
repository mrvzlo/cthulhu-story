import EncodingService from './encoding.service';
import FileSystemService from './file-system.service';
import LoadResult from './load-result';
import SaveModel from './save-model';

export default class SavingService<T> {
   private encodingService: EncodingService<SaveModel<T>>;
   private fileSystemService: FileSystemService;

   constructor(baseEntity: T) {
      const saveModel = new SaveModel(baseEntity);
      this.encodingService = new EncodingService(saveModel);
      this.fileSystemService = new FileSystemService(baseEntity.constructor.name);
   }

   public save(data: T): Promise<void> {
      const model = new SaveModel(data);
      const encoded = this.encodingService.encode256(model);
      return this.fileSystemService.save(encoded);
   }

   public load(): Promise<LoadResult<SaveModel<T>>> {
      return this.fileSystemService
         .read()
         .then((data) => {
            const model = this.encodingService.decode256(data);
            return new LoadResult(model);
         })
         .catch(() => new LoadResult());
   }
}
