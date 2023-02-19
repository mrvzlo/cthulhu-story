<template>
   <div v-if="character.status === statuses.new">{{ $t('pronoun') }}</div>
   <button v-on:click="genderSwap()">Swap gender</button>
</template>

<script setup lang="ts">
import Character from '../models/character';
import { defineProps } from 'vue';
import { CharacterStatus } from '../models/character-status';
import { GetFromStorage, SetToStorage } from '@/components/saving/storage.service';
import { UpdateLocale } from '@/i18n';

defineProps<{ character: Character }>();
const statuses = CharacterStatus;

const genderSwap = async () => {
   const current = await GetFromStorage('gender', 'male');
   const newGender = current === 'male' ? 'female' : 'male';
   await SetToStorage('gender', newGender);
   await UpdateLocale();
};
</script>
