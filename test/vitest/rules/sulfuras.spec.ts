import { Item } from '@/gilded-rose';
import { updateItem } from '../support/gilded-rose-test-helpers';

describe('Sulfuras', () => {
  it('never changes quality', () => {
    const item = updateItem(new Item('Sulfuras, Hand of Ragnaros', 5, 80));

    expect(item).toEqual({
      name: 'Sulfuras, Hand of Ragnaros',
      sellIn: 5,
      quality: 80,
    });
  });

  it('never changes sellIn, even when the sell date is already passed', () => {
    const item = updateItem(new Item('Sulfuras, Hand of Ragnaros', -1, 80));

    expect(item).toEqual({
      name: 'Sulfuras, Hand of Ragnaros',
      sellIn: -1,
      quality: 80,
    });
  });

  it('treats "Sulfuras, Gem of Ragnaros" as legendary', () => {
    const item = updateItem(new Item('Sulfuras, Gem of Ragnaros', 5, 80));

    expect(item).toEqual({
      name: 'Sulfuras, Gem of Ragnaros',
      sellIn: 5,
      quality: 80,
    });
  });
});
