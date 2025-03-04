<template>
  <div class="container w-100 h-max text-center">
    <h1>Foglalj időpontot</h1>
    <form class="p-5">
  <div class="form-group row">
    <label class=" col-form-label">Szolgáltatás</label>
    <div>
      <select v-model = "selectionOptions" name="szolgaltatas" id="szolgaltatas">
        <option v-for="opt in selectionOptions"  value= "{{ opt.value }}">{{ opt.label }}</option>
      </select>
    </div>
  </div>
  <div class="form-group row">
    <label class=" col-form-label">Időpont</label>
    <div>

  <label class="p-2">Válassz napot:</label>
  <select v-model="days">
    <option v-for="day in days" value="{{ day.value }}">{{ day.label }}</option>
  </select>

  <label class="p-2">Select Time:</label>
  <select v-model = "availableHours" name="szolgaltatas" id="szolgaltatas">
        <option v-for="available in availableHours"  value= "{{ available.value }}">{{ available.label }}</option>
      </select>
</div>
  </div>
</form>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useIdopontStore } from "@/stores/idopont.js";

const idopont = useIdopontStore();
const bookedTimes = ref([]);

onMounted(async () => {
  await idopont.LoadIdopont(); 
  bookedTimes.value = idopont.bookedTimes; // Assuming `bookedTimes` is fetched from store
});

const selectionOptions = [
  { value: "Fodrász", label: "Fodrász" },
  { value: "Pszichológus", label: "Pszichológus" },
  { value: "Műkörmös", label: "Műkörmös" },
  { value: "Orvos", label: "Orvos" },
  { value: "Műszaki vizsga", label: "Műszaki vizsga" },
  { value: "Tetováló", label: "Tetováló" },
  { value: "Hivatali ügyintézés", label: "Hivatali ügyintézés" },
];

const days = [
  { value: "Hétfő", label: "Hétfő" },
  { value: "Kedd", label: "Kedd" },
  { value: "Szerda", label: "Szerda" },
  { value: "Csütörtök", label: "Csütörtök" },
  { value: "Péntek", label: "Péntek" },
];

// Generate available hours from 08:00 to 16:00
const availableHours = computed(() => {
  const allHours = [];
  for (let i = 8; i < 16; i++) {
    allHours.push(`${i}:00`);
    allHours.push(`${i}:30`);
  }
  return allHours.filter(hour => !bookedTimes.value.includes(hour));
});
</script>
