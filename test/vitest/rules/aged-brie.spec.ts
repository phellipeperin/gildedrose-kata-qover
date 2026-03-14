import { Item } from '@/gilded-rose';
import { updateItem } from '../support/gilded-rose-test-helpers';

describe('Aged Brie', () => {
  it('increases in quality by 1 before the sell date', () => {
    const item = updateItem(new Item('Aged Brie', 5, 10));

    expect(item).toEqual({
      name: 'Aged Brie',
      sellIn: 4,
      quality: 11,
    });
  });

  it('increases in quality by 2 after the sell date has passed', () => {
    const item = updateItem(new Item('Aged Brie', 0, 10));

    expect(item).toEqual({
      name: 'Aged Brie',
      sellIn: -1,
      quality: 12,
    });
  });

  it('never increases above quality 50 before the sell date', () => {
    const item = updateItem(new Item('Aged Brie', 5, 50));

    expect(item).toEqual({
      name: 'Aged Brie',
      sellIn: 4,
      quality: 50,
    });
  });

  it('never increases above quality 50 after the sell date has passed', () => {
    const item = updateItem(new Item('Aged Brie', 0, 49));

    expect(item).toEqual({
      name: 'Aged Brie',
      sellIn: -1,
      quality: 50,
    });
  });

  it('treats "Aged Brie, Smoked Edition" as Aged Brie before the sell date', () => {
    const item = updateItem(new Item('Aged Brie, Smoked Edition', 5, 10));

    expect(item).toEqual({
      name: 'Aged Brie, Smoked Edition',
      sellIn: 4,
      quality: 11,
    });
  });

  it('treats "Aged Brie, Smoked Edition" as Aged Brie after the sell date', () => {
    const item = updateItem(new Item('Aged Brie, Smoked Edition', 0, 10));

    expect(item).toEqual({
      name: 'Aged Brie, Smoked Edition',
      sellIn: -1,
      quality: 12,
    });
  });

  it('caps "Aged Brie, Smoked Edition" at quality 50', () => {
    const item = updateItem(new Item('Aged Brie, Smoked Edition', 1, 50));

    expect(item).toEqual({
      name: 'Aged Brie, Smoked Edition',
      sellIn: 0,
      quality: 50,
    });
  });
});
