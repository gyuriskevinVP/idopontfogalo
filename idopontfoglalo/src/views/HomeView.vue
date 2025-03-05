<template>
  <div class="container w-100 h-max text-center">
    <h1>Foglalj időpontot</h1>
    <form class="p-5">
      <div class="form-group row mb-3">
        <label class="col-form-label">Szolgáltatás</label>
        <div>
          <select v-model="selectedService" name="szolgaltatas" id="szolgaltatas" class="form-select">
            <option value="">Válassz szolgáltatást</option>
            <option v-for="opt in selectionOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-form-label">Időpont</label>
        <div>
          <label class="p-2">Válassz napot:</label>
          <select v-model="selectedDay" class="form-select mb-2">
            <option value="">Válassz napot</option>
            <option v-for="day in days" :key="day.value" :value="day.value">{{ day.label }}</option>
          </select>

          <label class="p-2">Válassz órát:</label>
          <select v-model="selectedHour" name="ora" id="ora" class="form-select mb-3">
            <option value="">Válassz órát</option>
            <option v-for="hour in hours" :key="hour" >{{ hour }}:00</option>
          </select>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-primary" @click="proceedToBooking" :disabled="!isSelectionComplete">
          Tovább a foglaláshoz
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useIdopontStore } from "@/stores/idopont.js";
import { useRouter } from "vue-router";

const router = useRouter();
const idopontStore = useIdopontStore();
const selectedService = ref("");
const selectedDay = ref("");
const selectedHour = ref("");

onMounted(async () => {
  await idopontStore.LoadIdopont();
  console.log("Foglalasok", idopontStore.idopontok);
});



const selectionOptions = [
  { value: "fodrász", label: "Fodrász" },
  { value: "pszichológus", label: "Pszichológus" },
  { value: "műkörmös", label: "Műkörmös" },
  { value: "orvos", label: "Orvos" },
  { value: "műszaki vizsga", label: "Műszaki vizsga" },
  { value: "tetováló", label: "Tetováló" },
  { value: "hivatali ügyintézés", label: "Hivatali ügyintézés" },
];

const days = [
  { value: "hétfő", label: "Hétfő" },
  { value: "kedd", label: "Kedd" },
  { value: "szerda", label: "Szerda" },
  { value: "csütörtök", label: "Csütörtök" },
  { value: "péntek", label: "Péntek" },
];

console.log("asd" + idopontStore.idopontok)

const hours = ref([])
for(let i = 8; i < 17; i++){
  hours.value.push(i)
}
const isSelectionComplete = computed(() => {
  return selectedService.value && selectedDay.value && selectedHour.value;
});

const proceedToBooking = () => {
  console.log("Foglalasi adat:", {
    service: selectedService.value,
    day: selectedDay.value,
    hour: selectedHour.value
    
  });
  router.push("/foglalas")
};
</script>