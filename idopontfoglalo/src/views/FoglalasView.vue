<template>
  <div class="bg-dark text-light min-vh-100 d-flex align-items-center">
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="bg-dark border border-secondary rounded p-4">
            <h3 class="text-center mb-4">Foglalás véglegesítése</h3>
            <form @submit.prevent="foglalasMentese">

              <div class="mb-3">
                <label for="email" class="form-label">Email cím</label>
                <input type="email" v-model="email" id="email" class="form-control form-control-sm bg-dark text-light border-secindary" placeholder="pelda@email.hu" required>
              </div>

              <div class="mb-3">
                <label for="telefonszam">Telefonszam</label>
                <input type="text" v-model="telefon" id="telefonszam" class="form-control form-control-sm bg-dark text-light border-secondary" required>
              </div>

              <div class="mb-3">
                <p class="mb-1">Foglalás részletei:</p>
                <ul class="list-unstyled ps-3 text-secondary">
                  <li>
                    Szolgáltatás: {{ idopontStore.currentBooking.service }}
                  </li>
                  <li>Nap: {{ idopontStore.currentBooking.day }}</li>
                  <li>Időpont: {{ idopontStore.currentBooking.hour }}:00</li>
                </ul>
              </div>

              <div class="d-grid mt-4">

              <button
                  type="submit"
                  class="btn btn-outline-light btn-sm"
                  :disabled="idopontStore.isLoading"
                >
                  <span
                    v-if="idopontStore.isLoading"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  {{
                    idopontStore.isLoading
                      ? "Foglalás folyamatban..."
                      : "Foglalás megerősítése"
                  }}
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useIdopontStore } from "@/stores/idopont.js";
import { useToast } from "vue-toastification";

const router = useRouter();
const idopontStore = useIdopontStore();
const toast = useToast();

const email = ref("")
const telefon = ref("")

onMounted(() => {
  if( !idopontStore.currentBooking.service || !idopontStore.currentBooking.day || !idopontStore.currentBooking.hour ){
    toast.error("Nincsen kiválasztott időpont!")
    router.push("/")
  }
})

const foglalasMentese = async () => {
  if (!email.value || !telefon.value) {
    toast.error("Kérjük töltsd ki az összes mezőt!");
    return;
  }

  const foglalasAdat = {
    szolgaltatas: idopontStore.currentBooking.service,
    nap: idopontStore.currentBooking.day,
    ora: parseInt(idopontStore.currentBooking.hour),
    email: email.value,
    telefon: telefon.value,
  };

  try {
    const success = await idopontStore.saveBooking(foglalasAdat);
    if (success) {
      console.log("Foglalás sikeresen elmentve!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  } catch (error) {
    toast.error("Váratlan hiba történt a foglalás során!");
    console.error("Hiba:", error);
  }
};


</script>