import LZUTF8 from 'lzutf8/build/production/lzutf8';

export default class EncodingService<T> {
   private dict: string[];

   constructor(baseItem: T) {
      this.dict = Object.keys(baseItem);
   }

   encode256(src: T): string {
      const string = this.compress(src);
      const binary = LZUTF8.encodeUTF8(string);
      const encoded = LZUTF8.encodeStorageBinaryString(binary);
      return encoded;
   }

   private compress(src: T): string {
      let json = JSON.stringify(src);
      if (!json) return '';

      this.dict.forEach((value, index) => {
         json = json.split(value).join(String.fromCharCode(index + 1));
      });
      return json;
   }

   decode256(src: string): T {
      const binary = LZUTF8.decodeStorageBinaryString(src);
      const string = LZUTF8.decodeUTF8(binary);
      const data = this.decompress(string);
      return data;
   }

   private decompress(src: string): T {
      this.dict.forEach((value, index) => {
         src = src.split(String.fromCharCode(index + 1)).join(value);
      });
      return JSON.parse(src);
   }
}
