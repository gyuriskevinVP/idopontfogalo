import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";

export const useIdopontStore = defineStore("idopont", () => {
  const idopontok = ref([]);
  const szabadOra = ref([]);
  const isLoading = ref(false);
  const toast = useToast();

  const currentBooking = ref({
    service: "",
    day: "",
    hour: "",
  });
  const LoadIdopont = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get("http://localhost:3000/idopont");
      idopontok.value = response.data.idopont || response.data;
      isLoading.value = false;
      return idopontok.value;
    } catch (error) {
      console.error("Failed to load appointments:", error);
      toast.error("Nem sikerült betölteni az időpontokat");
      isLoading.value = false;
      return [];
    }
  };
  const getFreeHours = (szolgaltatas = "", nap = "") => {
    const allHours = Array.from({ length: 9 }, (_, i) => i + 8);
    if (!idopontok.value?.length) {
      szabadOra.value = allHours;
      return szabadOra.value;
    }
    const foglaltOrak = idopontok.value
      .filter(
        (idopont) =>
          (!szolgaltatas || idopont.szolgaltatas === szolgaltatas) &&
          (!nap || idopont.nap === nap)
      )
      .map((idopont) => idopont.ora);

    szabadOra.value = allHours.filter((ora) => !foglaltOrak.includes(ora));

    return szabadOra.value;
  };
  const setCurrentBooking = (service, day, hour) => {
    currentBooking.value = {
      service,
      day,
      hour,
    };
  };
  const saveBooking = async (bookingData) => {
    isLoading.value = true;

    try {
      const response = await axios.post(
        "http://localhost:3000/idopont",
        bookingData
      );
      toast.success("A foglalás sikeresen megtörtént!");
      await LoadIdopont();

      isLoading.value = false;
      return true;
    } catch (error) {
      isLoading.value = false;
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Ez az időpont már foglalt!");
        } else {
          toast.error(
            `Hiba történt: ${error.response.data?.message || "Ismeretlen hiba"}`
          );
        }
      }

      console.error("Foglalás mentése sikertelen:", error);
      return false;
    }
  };

  return {
    idopontok,
    szabadOra,
    isLoading,
    currentBooking,
    LoadIdopont,
    getFreeHours,
    setCurrentBooking,
    saveBooking,
  };
});
