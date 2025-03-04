import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export const useIdopontStore = defineStore('idopont', () => {
  const idopontok = ref([])
  const toast = useToast()
  

  const LoadIdopont = () => {
    axios.get('http://localhost:3000/idopont')
    .then(resp => idopontok.value = resp.data)
  }



  return { idopontok, LoadIdopont, useIdopontStore}
})

