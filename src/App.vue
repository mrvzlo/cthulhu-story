<style lang="scss">
@import '@/styles/main.scss';
</style>

<template>
   <div v-if="mainCharacter.status < statuses.story">
      <game-setup :character="mainCharacter"></game-setup>
   </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Character from './components/game/models/character';
import { CharacterStatus } from './components/game/models/character-status';
import SavingService from './components/saving/saving.service';
import GameSetup from './components/game/setup/game-setup.vue';

let mainCharacter = reactive(new Character());
const saveService = new SavingService<Character>(mainCharacter);
const statuses = CharacterStatus;

const checkSave = () => {
   saveService.load().then((x) => {
      if (!x.success) return;
      mainCharacter = x.result.entity;
      console.log(mainCharacter);
   });
};

checkSave();
</script>
