import { shallowMount } from '@vue/test-utils';
import TradingDeskTilesList from '@/components/tradingDesk/TradingDeskTilesList';

describe('TradingDeskTilesList', () => {
  const factory = (propsData) => shallowMount(TradingDeskTilesList, {
    propsData
  });

  describe('don\'t pass tiles in component', () => {
    test('not passing anything in tiles prop throws an console error', () => {
      const spy = jest.spyOn(global.console, 'error');
      factory();
      expect(spy).toBeCalledWith(expect.stringContaining('Missing required prop: "tiles"'));
      spy.mockReset();
    });
    

    test('if pass empty array in tiles prop, list items are missing ', () => {
      const wrapper = factory({ tiles: [] });
      const items = wrapper.findAll('li');

      expect(items.length).toBe(0);
    });
  });

  describe('pass tiles array in tiles prop', () => {
    let wrapper;
    const tiles = [{
      id: 0,
      title: 'Tile 1'
    }, {
      id: 1,
      title: 'Tile 2'
    }]

    beforeEach(() => {
      wrapper = factory({
        tiles
      });
    });

    test('list items exist', () => {
      const listItems = wrapper.findAll('li');

      expect(listItems.length).toBe(2);
    });

    test('click on tile button emmits tile-click event width passing id', () => {
      const secondTileButton = wrapper.findAll('li').at(1).find('button');
      secondTileButton.trigger('click');
      expect(wrapper.emitted('tile-click')).toBeTruthy();
      expect(wrapper.emitted('tile-click')[0]).toEqual([1]);
    });
  })
});
