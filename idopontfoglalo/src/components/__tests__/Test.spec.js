import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { useIdopontStore } from '@/stores/idopont';
import HomeView from '@/views/HomeView.vue';
import FoglalasView from '@/views/FoglalasView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/foglalas', component: FoglalasView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('Foglalás tesztek', () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
    router.push('/');
    await router.isReady();
  });

  it('HomeView tartalma betöltődik?', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.text()).toContain('Foglalj');
  });

  it('FoglalasView tartalma betöltődik?', async () => {
    await router.push('/foglalas');
    await router.isReady();

    const wrapper = mount(FoglalasView, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.text()).toContain('Foglalás');
  });

  it('FoglalásView átirányít, ha nincs foglalás beállítva', async () => {
    const idopont = useIdopontStore();
    const routerSpy = vi.spyOn(router, 'push');
    idopont.currentBooking.service = '';
    idopont.currentBooking.day = '';
    idopont.currentBooking.hour = '';

    mount(FoglalasView, {
      global: {
        plugins: [router],
      },
    });

    await new Promise(resolve => setTimeout(resolve, 50));
    expect(routerSpy).toHaveBeenCalledWith('/');
  });

  it('Hibát jelez, ha az űrlap nincs kitöltve', async () => {
    const idopont = useIdopontStore();
    idopont.currentBooking.service = 'Fodrász';
    idopont.currentBooking.day = 'Szerda';
    idopont.currentBooking.hour = 8;

    const wrapper = mount(FoglalasView, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('form').trigger('submit.prevent');
  });

  it('Sikeres foglalás mentése', async () => {
    const idopont = useIdopontStore();
    idopont.currentBooking.service = 'Fodrász';
    idopont.currentBooking.day = 'Szerda';
    idopont.currentBooking.hour = 8;

    const routerSpy = vi.spyOn(router, 'push');

    const wrapper = mount(FoglalasView, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find("#email").setValue("teszt@example.com");
    await wrapper.find("#telefonszam").setValue("123456789");
    await wrapper.find("form").trigger("submit.prevent");
    await new Promise(resolve => setTimeout(resolve, 1600));
    expect(routerSpy).toHaveBeenCalledWith("/");
  });
});
