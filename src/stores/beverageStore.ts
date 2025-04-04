import { defineStore } from "pinia";
import tempretures from "../data/tempretures.json";
import { addDoc, getDocs, collection } from "firebase/firestore";
//import db from "../firebase";
import { BeverageType, BaseBeverageType, CreamerType, SyrupType } from "../types/beverage";
import db from "../firebase.ts";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],
    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,
    creamers: [] as CreamerType[],
    currentCream: null as CreamerType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    currentName: "",
    beverageList: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
  }),

  actions: {
    async init() {
      const baseSnapshot = await getDocs(collection(db, "bases"));
      const creamerSnapshot = await getDocs(collection(db, "creamers"));
      const syrupSnapshot = await getDocs(collection(db, "syrups"));

      this.bases = baseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BaseBeverageType[];
      this.creamers = creamerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CreamerType[];
      this.syrups = syrupSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SyrupType[];

      this.currentBase = this.bases[0];
      this.currentCream = this.creamers[0];
      this.currentSyrup = this.syrups[0];
    },
    async makeBeverage() {
      this.currentBeverage = {
        name: this.currentName,
        id: `${this.currentTemp}-${this.currentBase?.id}-${this.currentCream?.id}-${this.currentSyrup?.id}`,
        temp: this.currentTemp,
        base: this.currentBase!,
        syrup: this.currentSyrup!,
        creamer: this.currentCream!
      };
    
      this.beverageList.push(this.currentBeverage);
    
      // Save to Firestore
      await addDoc(collection(db, "beverages"), this.currentBeverage);
    },
    async fetchBeverages() {
      const snapshot = await getDocs(collection(db, "beverages"));
      this.beverageList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BeverageType[];
    },
    showBeverage(beverage: BeverageType) {
      this.currentTemp = beverage.temp;
      this.currentBase = beverage.base;
      this.currentCream = beverage.creamer;
      this.currentSyrup = beverage.syrup;
      this.currentName = beverage.name;
      this.currentBeverage = beverage;
    },
  },
});
