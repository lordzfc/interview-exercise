import { MainStore } from '../store.js';
// import context from 'jest-plugin-context';

const colors = [{
  'name': 'aliceblue',
  'hex': 'f0f8ff'
  },
  {
  'name': 'antiquewhite',
  'hex': 'faebd7'
  },
  {
  'name': 'aqua',
  'hex': '00ffff'
  },
  {
  'name': 'aquamarine',
  'hex': '7fffd4'
  },
  {
  'name': 'azure',
  'hex': 'f0ffff'
}];

describe('MainStore', ()=> {
  const store = new MainStore(colors);

  beforeAll(()=> {
    store.updateSearchInputVal(null);
  })
  
  it('should return an empty array if a searchInput is empty', () => {
    // console.log(this.store);
    store.updateSearchInputVal('');
    
    expect(store.entriesList).toEqual([]);
  })

  it('should return an empty array if a searchInputs length is less than 2', () => {
    store.updateSearchInputVal('x');
    expect(store.entriesList).toEqual([]);
  })

  it('should return an array of two elements if a searchInput is "aq"', () => {
    store.updateSearchInputVal('aq');
    const expectedArr = [
      {
        'name': 'aqua',
        'hex': '00ffff'
        },
      {
        'name': 'aquamarine',
        'hex': '7fffd4'
      }
    ];
    expect(store.entriesList).toEqual(expectedArr);
  })

})