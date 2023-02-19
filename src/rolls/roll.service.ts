import DiceRoll from './dice-roll';

export default class RollService {
   constructor(private dice: DiceRoll) {}

   makeRoll = (need: number) => {
      this.dice.inProcess = true;
      this.repeat(20, 20, this.reroll, () => this.finish(need));
   };

   reroll = () => (this.dice.result = Math.floor(Math.random() * 100) + 1);

   finish = (need: number) => {
      this.dice.inProcess = false;
      this.dice.success = this.dice.result <= need;
   };

   repeat = (count: number, delay: number, iterationCallback: () => void, finishCallback: () => void) => {
      count--;
      iterationCallback();
      if (count == 0) {
         finishCallback();
         return;
      }
      setTimeout(() => this.repeat(count, delay, iterationCallback, finishCallback), delay);
   };
}
