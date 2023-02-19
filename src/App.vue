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
import RollModel from './rolls/dice-roll';
import RollService from './rolls/roll.service';
const roll = reactive(new RollModel());
const service = new RollService(roll);

const makeRoll = (need) => service.makeRoll(need);
</script>
