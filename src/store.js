import { observable, computed, action, runInAction} from "mobx";
import fetch from 'cross-fetch';

const COLORS_URL = 'http://www.mocky.io/v2/5a37a7403200000f10eb6a2d';
const START_SEARCH = 2;

export class MainStore {
  @observable colors = [];
  @observable searchInput = '';
  @observable backgroundColor = '';
  @observable state = "pending"

  autocomplete() {
    return this.colors.filter((c)=>c.name.indexOf(this.searchInput) !== -1);
  }

  constructor(initData) {
    if(initData && initData.length > 0) {
      this.colors = initData;
    }
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