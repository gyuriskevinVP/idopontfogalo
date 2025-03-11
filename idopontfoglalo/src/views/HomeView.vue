<template>
  <div class="bg-dark text-light min-vh-100 d-flex align-items-center">
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="bg-dark border border-secondary rounded p-4">
            <h3 class="text-center mb-4">Foglalj időpontot</h3>
            <form>
              <div class="mb-3">
                <label for="szolgaltatas" class="form-label"
                  >Szolgáltatás</label
                >
                <select
                  v-model="selectedService"
                  id="szolgaltatas"
                  class="form-select form-select-sm bg-dark text-light border-secondary"
                >
                  <option value="">Válassz szolgáltatást</option>
                  <option
                    v-for="opt in selectionOptions"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="day" class="form-label">Nap</label>
                <select
                  v-model="selectedDay"
                  id="day"
                  class="form-select form-select-sm bg-dark text-light border-secondary"
                >
                  <option value="">Válassz napot</option>
                  <option
                    v-for="day in days"
                    :key="day.value"
                    :value="day.value"
                  >
                    {{ day.label }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="ora" class="form-label">Óra</label>
                <select
                  v-model="selectedHour"
                  id="ora"
                  class="form-select form-select-sm bg-dark text-light border-secondary"
                >
                  <option value="">Válassz órát</option>
                  <option v-for="hour in availableHours" :key="hour">
                    {{ hour }}:00
                  </option>
                </select>
              </div>

              <div class="d-grid mt-4">
                <button
                  type="button"
                  class="btn btn-outline-light btn-sm"
                  @click="proceedToBooking"
                  :disabled="!isSelectionComplete"
                  id="foglalas"
                >
                  Tovább a foglaláshoz
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useIdopontStore } from "@/stores/idopont.js";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const idopontStore = useIdopontStore();
const toast = useToast();

const selectedService = ref("");
const selectedDay = ref("");
const selectedHour = ref("");

onMounted(async () => {
  try {
    await idopontStore.LoadIdopont();
    console.log("Foglalasok", idopontStore.idopontok);
  } catch (error) {
    toast.error("Nem sikerült betölteni az időpontokat");
  }
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

const availableHours = computed(() => {
  const hours =
    selectedService.value && selectedDay.value
      ? idopontStore.getFreeHours(selectedService.value, selectedDay.value)
      : Array.from({ length: 9 }, (_, i) => i + 8);

  if (selectedHour.value && !hours.includes(parseInt(selectedHour.value))) {
    selectedHour.value = "";
  }

  return hours;
});

const isSelectionComplete = computed(
  () => selectedService.value && selectedDay.value && selectedHour.value
);

const proceedToBooking = () => {
  idopontStore.setCurrentBooking(
    selectedService.value,
    selectedDay.value,
    selectedHour.value
  );

  toast("Időpont kiválasztva, folytatás a foglaláshoz");
  setTimeout(() => {
    router.push("/foglalas");
  }, 2000);
};
</script>