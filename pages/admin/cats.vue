<script setup>
import {Modal} from 'flowbite';

let updateModal = null;
let createModal = null;

onMounted(() => {
    //Setup modals
    // options with default values
    const options = {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
    };

    createModal = new Modal(document.getElementById('createCat'), options);
    updateModal = new Modal(document.getElementById('updateCat'), options);

});

definePageMeta({
  layout: "admin",
  middleware: 'auth'
});

let name = ref("");
let description = ref("");
let sexe2 = ref("");
let id = null;

const initVar = () => {
  name.value = ref("");
  description.value = ref("");
  sexe2.value = ref("");
  id = null;
}

const createModalShow = () => {
  initVar();
  createModal.show();
}

const fetchCat = async (idCat) => {
  initVar();
  const {data: cat} = await useFetch('/api/cat/cat?id=' + idCat, {
    method: 'GET',
  });

  id = idCat;
  name.value = cat.value.name;
  description.value = cat.value.description;
  sexe2.value = cat.value.sexe;
  window.document.getElementById("birthDate2").value = $dateFormat(new Date(cat.value.dateofbirth));

  // toggle the updateModal
  updateModal.toggle();
}

const updateCat = async () => {
  const {data: resDataSuccess} = await $fetch('/api/cat/cat', {
    method: 'PATCH',
    body: {
      id: id,
      name: name.value,
      description: description.value,
      sexe: sexe2.value,
      dateOfBirth: new Date(window.document.getElementById("birthDate2").value)
    },
  })

  initVar();
  // updateModal.toggle();
}

const deleteCat = async () => {
  const {data: resDataSuccess} = await useFetch('/api/cat/cat', {
    method: 'DELETE',
    body: {
      id: id,
    }
  })

  initVar();
}


//Fetch cats
const {data: cats} = useFetch('/api/cat/cats', {
  method: 'GET',
});

const {$dateFormat, $getAge} = useNuxtApp()

</script>

<template>
  <!-- Modal toggle -->
  <div class="flex m-5">
    <button id="defaultModalButton" @click="createModalShow"
            class="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
      Ajouter un chat
    </button>
  </div>

  <h2 class="text-4xl font-extrabold dark:text-white mb-4">Liste des chats</h2>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Nom du chat
        </th>
        <th scope="col" class="px-6 py-3">
          Sexe
        </th>
        <th scope="col" class="px-6 py-3">
          Date de naissance
        </th>
        <th scope="col" class="px-6 py-3">
          Age
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cat in cats" @click="fetchCat(cat.id)"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ cat.name }}
        </th>
        <td class="px-6 py-4">
          {{ cat.sexe }}
        </td>
        <td class="px-6 py-4">
          {{ $dateFormat(new Date(cat.dateofbirth)) }}
        </td>
        <td class="px-6 py-4">
          {{ $getAge(new Date(cat.dateofbirth)) }} ans
        </td>
      </tr>
      </tbody>
    </table>
  </div>


  <ModalsCreateCat @close-modal="createModal.hide()"/>

  <!-- Main updateModal -->
  <div id="updateCat" tabindex="-1" aria-hidden="true"
       class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Mettre à jour un chat
          </h3>
          <button type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="updateModal.hide()">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Fermer</span>
          </button>
        </div>
        <!-- Modal body -->
        <form>
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
              <input type="text"
                     id="name"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     placeholder=""
                     v-model="name"
                     required>
            </div>

            <div>
              <label for="birthDate2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date de
                naissance</label>
              <div class="relative max-w-sm">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                       viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"></path>
                  </svg>
                </div>
                <input id="birthDate2"
                       datepicker
                       type="text"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder="Selectionner une date"
                       ref="dateOfBirth"
                       required>
              </div>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexe</label>
              <ul class="grid w-full gap-6 md:grid-cols-2">
                <li>
                  <input type="radio" id="hosting-small2" name="hosting2" value="Male" class="hidden peer" required
                         v-model="sexe2">
                  <label for="hosting-small2"
                         class="inline-flex items-center justify-between w-full p-1.5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div class="block">
                      <div class="w-full text-lg font-semibold">Male</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" fill="currentColor"
                         class="w-6 h-6 ml-3">
                      <path
                          d="M800 256v220h-60V359L556 542q21 29 32.5 63.5T600 676q0 92-64 156t-156 64q-92 0-156-64t-64-156q0-92 64-156t156-64q36 0 70 11.5t63 32.5l184-184H580v-60h220ZM380.202 516Q314 516 267 562.798t-47 113Q220 742 266.798 789t113 47Q446 836 493 789.202t47-113Q540 610 493.202 563t-113-47Z"/>
                    </svg>
                  </label>
                </li>
                <li>
                  <input type="radio" id="hosting-big2" name="hosting2" value="Femelle" class="hidden peer"
                         v-model="sexe2">
                  <label for="hosting-big2"
                         class="inline-flex items-center justify-between w-full p-1.5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-pink-500 peer-checked:border-pink-600 peer-checked:text-pink-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div class="block">
                      <div class="w-full text-lg font-semibold">Femelle</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" fill="currentColor"
                         class="w-6 h-6 ml-3">
                      <path
                          d="M450 936v-80h-80v-60h80V694q-82-11-136-73.706T260 475q0-91.417 64.5-155.209Q389 256 480 256t155.5 63.791Q700 383.583 700 475q0 82.588-54 145.294Q592 683 510 694v102h80v60h-80v80h-60Zm29.798-300Q546 636 593 589.202t47-113Q640 410 593.202 363t-113-47Q414 316 367 362.798t-47 113Q320 542 366.798 589t113 47Z"/>
                    </svg>
                  </label>
                </li>
              </ul>
            </div>

            <div class="sm:col-span-2">
              <label for="last_name"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <input type="text"
                     id="last_name"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     placeholder=""
                     v-model="description"
                     required>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button
                class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                @click="updateCat()">
              Mettre à jour
            </button>
            <button @click="deleteCat()"
                    class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
              <svg class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"></path>
              </svg>
              Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
