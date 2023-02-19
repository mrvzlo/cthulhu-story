export default class LoadResult<T> {
   success: boolean;

   constructor(public result: T = null) {
      this.success = result !== null;
   }
}
