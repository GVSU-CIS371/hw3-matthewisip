<template>
  <div>
    <Beverage :isIced="beverageStore.currentTemp === 'Cold'" />
    <ul>
      <li>
        <template v-for="temp in beverageStore.temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="beverageStore.currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
    </ul>

    <ul>
      <li>
        <template v-for="base in beverageStore.bases" :key="base.id">
          <label>
            <input
              type="radio"
              name="baseBeverage"
              :id="`r${base.id}`"
              :value="base"
              v-model="beverageStore.currentBase"
            />
            {{ base.name }}
          </label>
        </template>
      </li>
    </ul>
    <!-- <BaseBeverage :color="currentBase.color" /> -->

    <ul>
      <li>
        <template v-for="(cream, index) in beverageStore.creamers" :key="cream.id">
          <label>
            <input
              type="radio"
              name="creamer"
              :id="`r${cream.id}`"
              :value="cream"
              :checked="index === 0"
              v-model="beverageStore.currentCream"
            />
            {{ cream.name }}
          </label>
        </template>
      </li>
    </ul>

    <ul>
      <li>
        <template v-for="(syrup, index) in beverageStore.syrups" :key="syrup.id">
          <label>
            <input
              type="radio"
              name="syrup"
              :id="`r${syrup.id}`"
              :value="syrup"
              :checked="index===0"
              v-model="beverageStore.currentSyrup"
            />
            {{ syrup.name }}
          </label>
        </template>
      </li>
    </ul>
    <input type="text" placeholder="Beverage Name" v-model="beverageStore.currentName"/>
    <button @click = "beverageStore.makeBeverage()">Make Beverage</button>
  </div>
  <div v-if="beverageStore.beverageList.length > 0">
  <ul class="beverage-radio-list">
    <li v-for="bev in beverageStore.beverageList" :key="bev.id">
      <label>
        <input
          type="radio"
          name="selectedBeverage"
          :value="bev.id"
          @change="beverageStore.showBeverage(bev)"
        />
        {{ bev.name }}
      </label>
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";
const beverageStore = useBeverageStore();

onMounted(async () => {
  await beverageStore.init();  
  await beverageStore.fetchBeverages();
});

</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}
.beverage-radio-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  margin: 0;
}
.beverage-radio-list li {
  list-style: none;
}
</style>