import { createLocalVue, shallowMount } from '@vue/test-utils';
import TradingDeskTile from '@/components/tradingDesk/TradingDeskTile.vue';
import Tile from '@/entities/TileClass';

const left = 100;
const top = 200;
const width = 300;
const height = 400;

describe('TradingDeskTile', () => {
  const factory = (localVue, propsData) => shallowMount(TradingDeskTile, {
    localVue,
    propsData
  });

  test('passing empty tile data throws an error', () => {
    expect(() => factory({
        tile: {}
    })).toThrow();
  });

  describe('passing correct tile data:', () => {
    let wrapper;
    
    const localVue = createLocalVue();
    localVue.directive('resize', {});

    beforeEach(() => {
      const tile = new Tile(1, left, top, width, height);
      
      wrapper = factory(localVue, {
        tile
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('isTileDataValid is equal to true', () => {
      expect(wrapper.vm.isTileDataValid).toBe(true);
    });
  
    test('correct styles exists', () => {
      const styles = {
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
        'z-index': 1
      };

      expect(wrapper.vm.styles).toEqual(styles);
    });

    test('correct title exists', () => {
      const title = 'Tile 2';
      expect(wrapper.text()).toContain(title);
    });  
    
    test('mousedown emits activate tile event', () => {
      wrapper.trigger('mousedown');
      expect(wrapper.emitted('activate-tile')).toBeTruthy();
      expect(wrapper.emitted('activate-tile')[0]).toEqual([1]);
    });
  
    test('click on button calls tile instance hide method', () => {
      const spy = jest.spyOn(wrapper.vm.tile, 'hide');
      wrapper.find('button.tile-remove-button').trigger('click');
      expect(spy).toBeCalled();
    });

    test('click on button emits close tile event', () => {
      wrapper.find('button.tile-remove-button').trigger('click');
      expect(wrapper.emitted('close-tile')).toBeTruthy();
    });
  });

  describe('resize event', () => {
    let wrapper;
    let setSizeSpy;
    const newWidth = 500;
    const newHeight = 600;
    const localVue = createLocalVue();
    localVue.directive('resize', {
      inserted: jest.fn((_, binding) => {
        const cb = binding.value;
        cb({
          height: newHeight,
          width: newWidth
        });
      })
    });
    
    beforeEach(() => {
      const tile = new Tile(1, left, top, width, height);
      setSizeSpy = jest.spyOn(tile, 'setSize');

      wrapper = factory(localVue, {
        tile
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('calls tile instance resize method', () => {
      wrapper.trigger('resize');
      expect(setSizeSpy).toBeCalledWith(newWidth, newHeight);
    });

    test('emits tile resized event', () => {
      wrapper.trigger('resize');
      expect(wrapper.emitted('tile-resized')).toBeTruthy();
    });
  });
});