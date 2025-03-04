<script setup>
</script>

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

  <!-- Time Picker (Hours & Minutes) -->
  <label class="p-2">Select Time:</label>
  <input>
</div>
  </div>
</form>
  </div>
</template>


<script setup>

import {ref} from 'vue'

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
  {value: "Hétfő", label: "Hétfő"},
  {value: "Kedd", label: "Kedd"},
  {value: "Szerda", label: "Szerda"},
  {value: "Csütörtök", label: "Csütörtök"},
  {value: "Péntek", label: "Péntek"},
]

</script>