import { GildedRose, Item } from '@/gilded-rose';
import { updateItem } from '../support/gilded-rose-test-helpers';

describe('Normal items', () => {
  it('returns an empty array when created without items', () => {
    const items = new GildedRose().updateQuality();

    expect(items).toEqual([]);
  });

  it('decrease sellIn and quality by 1 before the sell date', () => {
    const item = updateItem(new Item('+5 Dexterity Vest', 10, 20));

    expect(item).toEqual({
      name: '+5 Dexterity Vest',
      sellIn: 9,
      quality: 19,
    });
  });

  it('decrease quality twice as fast once the sell date has passed', () => {
    const item = updateItem(new Item('+5 Dexterity Vest', 0, 20));

    expect(item).toEqual({
      name: '+5 Dexterity Vest',
      sellIn: -1,
      quality: 18,
    });
  });

  it('never make quality negative before the sell date', () => {
    const item = updateItem(new Item('+5 Dexterity Vest', 10, 0));

    expect(item).toEqual({
      name: '+5 Dexterity Vest',
      sellIn: 9,
      quality: 0,
    });
  });

  it('never make quality negative after the sell date has passed', () => {
    const item = updateItem(new Item('+5 Dexterity Vest', 0, 1));

    expect(item).toEqual({
      name: '+5 Dexterity Vest',
      sellIn: -1,
      quality: 0,
    });
  });
});
