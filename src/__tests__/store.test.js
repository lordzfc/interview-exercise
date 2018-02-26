import { MainStore } from '../store.js';
// import context from 'jest-plugin-context';

const colors = [
  {
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
  }
];

describe('MainStore', ()=> {
  const store = new MainStore(colors);

  beforeAll(()=> {
    store.updateSearchInputVal('');
    store.setbgColor('');
  });
  
  it('should return an empty array if a searchInput is empty', () => {
    // console.log(this.store);
    store.updateSearchInputVal('');
    
    expect(store.entriesList).toEqual([]);
  });

  it('should return an empty array if a searchInputs length is less than 2', () => {
    store.updateSearchInputVal('x');
    expect(store.entriesList).toEqual([]);
  });

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
      },
      {
        'name': 'antiquewhite',
        'hex': 'faebd7'
      }
    ];
    expect(store.entriesList).toEqual(expectedArr);
  });

  it('should return one element if a searchInput is "ati"', () => {
    store.updateSearchInputVal('ati');
    const expectedArr = [
      {
        'name': 'antiquewhite',
        'hex': 'faebd7'
      }
    ];
    expect(store.entriesList).toEqual(expectedArr);
  });

  it('should return a proper color in rgba (with 0.5 opacity) if a hexColor is F0F', () => {
    store.setbgColor('F0F');
    expect(store.bgColorCssVal).toEqual('rgba(255,0,255,0.5)');
  })

})