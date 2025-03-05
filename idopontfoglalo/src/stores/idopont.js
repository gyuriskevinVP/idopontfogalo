import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export const useIdopontStore = defineStore('idopont', () => {
  const idopontok = ref([])
  const szabadOra = ref([])
  const toast = useToast()
  
  const LoadIdopont = async () => {
    try {
      const response = await axios.get('http://localhost:3000/idopont')
      idopontok.value = response.data.idopont || response.data
      return idopontok.value
    } catch (error) {
      console.error('Failed to load appointments:', error)
      toast.error('Nem sikerült betölteni az időpontokat')
      return []
    }
  }

  const getFreeHours = (szolgaltatas = "", nap = "") => {
    const allHours = Array.from({ length: 9 }, (_, i) => i + 8);
    
    const occupiedHours = [];
    
    if (idopontok.value && idopontok.value.length > 0) {
      idopontok.value.forEach(appointment => {
        if (szolgaltatas && nap) {
          if (appointment.szolgaltatas === szolgaltatas && appointment.nap === nap) {
            occupiedHours.push(appointment.ora);
          }
        }
        else if (szolgaltatas && !nap) {
          if (appointment.szolgaltatas === szolgaltatas) {
            occupiedHours.push(appointment.ora);
          }
        }
        else if (!szolgaltatas && nap) {
          if (appointment.nap === nap) {
            occupiedHours.push(appointment.ora);
          }
        }
        else {
          occupiedHours.push(appointment.ora);
        }
      });
    }
    szabadOra.value = allHours.filter(hour => !occupiedHours.includes(hour));
    
    return szabadOra.value;
  }
  
  return { 
    idopontok,
    szabadOra,
    LoadIdopont,
    getFreeHours
  }
})