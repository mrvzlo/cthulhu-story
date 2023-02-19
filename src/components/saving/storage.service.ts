import { Storage } from '@capacitor/storage';

type key = 'gender';

export async function SetToStorage(key: key, value: string) {
   await Storage.set({ key, value });
}

export async function GetFromStorage(key: key, fallback: string): Promise<string> {
   const { value } = await Storage.get({ key });
   return value ?? fallback;
}
