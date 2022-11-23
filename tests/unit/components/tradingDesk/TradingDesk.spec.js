import { shallowMount } from '@vue/test-utils';
import TradingDesk from "@/components/tradingDesk/TradingDesk.vue";

describe('TradingDesk', () => {
  const wrapper = shallowMount(TradingDesk);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  test('has DragAndDropArea', () => {
    const dragAndDropArea = wrapper.findComponent({name: 'drag-and-drop-area'});
    expect(dragAndDropArea.exists()).toBeTruthy();
  });

  test('getElEndPosition emits', () => {
    wrapper.vm.getElEndPosition();
    expect(wrapper.emitted('end-position-change')).toBeTruthy();
  });

  test('getElPosition emits expected data', () => {
    const e = {
      target: {},
      position: {}
    };

    wrapper.vm.getElPosition(e);
    expect(wrapper.emitted('position-change')).toBeTruthy();
    expect(wrapper.emitted('position-change')[0]).toEqual([e]);
  });
})
