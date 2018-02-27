import { observable, computed, action, runInAction} from "mobx";
import fetch from 'cross-fetch';

const COLORS_URL = 'http://www.mocky.io/v2/5a37a7403200000f10eb6a2d';
const START_SEARCH = 2;
const MAX_SEARCH_ARR_SIZE = 10;

export class MainStore {
  @observable colors = [];
  @observable searchInput = '';
  @observable backgroundColor = '';
  @observable state = "pending";

  constructor(initData) {
    if(initData && initData.length > 0) {
      this.colors = initData;
    }
  }

  autocomplete() {
    const strongCondition = (c, input) => c.name.includes(input);

    // The reason why I wrote that 'magic function' is simple - there is no default method for checking
    // if *every* element from one array exists in second one.
    // i.e 'if [1, 2] is in [1, 3, 4]'* condition should return false because not every element from first array is in second one
    // but 'if [1, 2] is in [1, 3, 2]' should return true because both 1, 2 we can find in second one
    // Cuz strings are arrays, we can map and check if every element from the input exists in color.name property.
    // If there is at least one 'false' result, we can assume that not every character from the input is in color.name property.
    //
    // pure functional approach -> !input.split('').map(e=>c.name.includes(e)).includes(false);
    // finally I used a bit more imperative approach because it's a bit faster and easier to read
    // *pseudocode

    const lightCondition = (c, input) => {
      const inputArr = input.split('');
      for(let idx in inputArr) {
        if(!c.name.includes(inputArr[idx])) {
          return false;
        }
      }
      return true;
    }    

    const createEntriesArr = (arr, input, filterFunc) => arr.filter(c => filterFunc(c, input));
    
    return [...new Set([
      ...createEntriesArr(this.colors, this.searchInput, strongCondition), 
      ...createEntriesArr(this.colors, this.searchInput, lightCondition)
    ])]; // union of two arrays cuz entries can repeat

  }

  @computed get entriesList() {
    if(this.searchInput.length < START_SEARCH) {
      return [];
    }
    return this.autocomplete();
  }
// filter -> contains
  @computed get bgColorCssVal() {
    if(!this.backgroundColor) {
      return;
    }
    const bgColor = this.backgroundColor.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))
    .join(',');  
    return `rgba(${bgColor},0.5)`;
    return '...';
  }

  @action async fetchColors() {
    this.state = "pending"
      try {
        const res = await fetch(COLORS_URL);
        
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }

        const colors = await res.json();
        // after await, modifying state again, needs an actions:
        runInAction(() => {
            this.state = "done";
            this.colors = colors;
        })
      } catch (error) {
        runInAction(() => {
            this.state = "error";
        })
      }
  }

  @action setbgColor(color) {
    this.backgroundColor = color;
  }

  @action updateSearchInputVal(input) {
    this.searchInput = input;
  }
}