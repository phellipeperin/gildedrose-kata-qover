import { Item } from '@/gilded-rose';
import { updateItem } from '../support/gilded-rose-test-helpers';

describe('Conjured items', () => {
  it('decrease in quality by 2 before the sell date', () => {
    const item = updateItem(new Item('Conjured Mana Cake', 3, 6));

    expect(item).toEqual({
      name: 'Conjured Mana Cake',
      sellIn: 2,
      quality: 4,
    });
  });

  it('decrease in quality by 4 after the sell date has passed', () => {
    const item = updateItem(new Item('Conjured Mana Cake', 0, 6));

    expect(item).toEqual({
      name: 'Conjured Mana Cake',
      sellIn: -1,
      quality: 2,
    });
  });

  it('never makes quality negative before the sell date', () => {
    const item = updateItem(new Item('Conjured Mana Cake', 3, 1));

    expect(item).toEqual({
      name: 'Conjured Mana Cake',
      sellIn: 2,
      quality: 0,
    });
  });

  it('never makes quality negative after the sell date has passed', () => {
    const item = updateItem(new Item('Conjured Mana Cake', 0, 3));

    expect(item).toEqual({
      name: 'Conjured Mana Cake',
      sellIn: -1,
      quality: 0,
    });
  });

  it('treats "Conjured Elixir of the Mongoose" as conjured before the sell date', () => {
    const item = updateItem(new Item('Conjured Elixir of the Mongoose', 3, 6));

    expect(item).toEqual({
      name: 'Conjured Elixir of the Mongoose',
      sellIn: 2,
      quality: 4,
    });
  });

  it('treats "Conjured Elixir of the Mongoose" as conjured after the sell date', () => {
    const item = updateItem(new Item('Conjured Elixir of the Mongoose', 0, 6));

    expect(item).toEqual({
      name: 'Conjured Elixir of the Mongoose',
      sellIn: -1,
      quality: 2,
    });
  });
});
