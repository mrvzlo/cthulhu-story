<style lang="scss">
@import '@/styles/main.scss';
</style>

<template>
   <div class="flex">
      <div class="dice">{{ ~~(roll.result / 10) }}</div>
      <div class="dice">{{ roll.result % 10 }}</div>
   </div>
   <div v-if="!roll.inProcess">{{ roll.success ? 'Yes' : 'No' }}</div>
   <button v-if="!roll.inProcess" v-on:click="makeRoll(50)">Roll</button>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Character from './components/game/character';
import SavingService from './components/saving/saving.service';
import RollModel from './rolls/dice-roll';
import RollService from './rolls/roll.service';

const roll = reactive(new RollModel());
const rollService = new RollService(roll);
let mainCharacter = reactive(new Character());
const saveService = new SavingService<Character>(mainCharacter);

const makeRoll = (need) => rollService.makeRoll(need);

const checkSave = () => {
   saveService.load().then((x) => {
      if (!x.success) return;
      mainCharacter = x.result.entity;
      console.log(mainCharacter);
   });
};

checkSave();
</script>
