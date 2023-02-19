import { CharacterStatus } from './character-status';

export default class Character {
   status = CharacterStatus.new;
   health = 10;
   maxHealth = 10;
   sanity = 50;
   maxSanity = 99;
   skills: number[] = [];
}
