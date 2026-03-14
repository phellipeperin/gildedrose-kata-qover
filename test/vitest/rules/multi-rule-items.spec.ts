import { Item } from '@/gilded-rose';
import { updateItem } from '../support/gilded-rose-test-helpers';

describe('Items matching multiple rules', () => {
  it('keeps Sulfuras hybrid items unchanged because the Sulfuras rule has top priority', () => {
    const item = updateItem(
      new Item('Conjured Sulfuras, Ancient Aged Brie', 5, 80)
    );

    expect(item).toEqual({
      name: 'Conjured Sulfuras, Ancient Aged Brie',
      sellIn: 5,
      quality: 80,
    });
  });

  it('applies both Aged Brie and Backstage rules when both names are included', () => {
    const item = updateItem(
      new Item('Backstage passes for the Aged Brie tasting contest', 10, 20)
    );

    expect(item).toEqual({
      name: 'Backstage passes for the Aged Brie tasting contest',
      sellIn: 9,
      quality: 23,
    });
  });

  it('lets the higher-priority Backstage rule win over Aged Brie after the concert', () => {
    const item = updateItem(
      new Item('Backstage passes for the Aged Brie tasting contest', 0, 20)
    );

    expect(item).toEqual({
      name: 'Backstage passes for the Aged Brie tasting contest',
      sellIn: -1,
      quality: 0,
    });
  });

  it('combines Conjured and Aged Brie into a net decrease before the sell date', () => {
    const item = updateItem(new Item('Conjured Aged Brie wheel', 3, 10));

    expect(item).toEqual({
      name: 'Conjured Aged Brie wheel',
      sellIn: 2,
      quality: 9,
    });
  });

  it('combines Conjured and Aged Brie into a stronger net decrease after the sell date', () => {
    const item = updateItem(new Item('Conjured Aged Brie wheel', 0, 10));

    expect(item).toEqual({
      name: 'Conjured Aged Brie wheel',
      sellIn: -1,
      quality: 8,
    });
  });

  it('lets Backstage priority restore quality after Conjured degradation before the concert', () => {
    const item = updateItem(
      new Item('Conjured Backstage passes to a TAFKAL80ETC concert', 10, 20)
    );

    expect(item).toEqual({
      name: 'Conjured Backstage passes to a TAFKAL80ETC concert',
      sellIn: 9,
      quality: 20,
    });
  });

  it('lets Backstage priority drop quality to 0 after the concert even when Conjured also matches', () => {
    const item = updateItem(
      new Item('Conjured Backstage passes to a TAFKAL80ETC concert', 0, 20)
    );

    expect(item).toEqual({
      name: 'Conjured Backstage passes to a TAFKAL80ETC concert',
      sellIn: -1,
      quality: 0,
    });
  });

  it('applies Conjured, Backstage passes, and Aged Brie together using rule priority', () => {
    const item = updateItem(
      new Item('Conjured Backstage passes for the Aged Brie tasting contest', 10, 20)
    );

    expect(item).toEqual({
      name: 'Conjured Backstage passes for the Aged Brie tasting contest',
      sellIn: 9,
      quality: 21,
    });
  });

  it('keeps the Backstage reset when Conjured and Aged Brie also match after the concert', () => {
    const item = updateItem(
      new Item('Conjured Backstage passes for the Aged Brie tasting contest', 0, 20)
    );

    expect(item).toEqual({
      name: 'Conjured Backstage passes for the Aged Brie tasting contest',
      sellIn: -1,
      quality: 0,
    });
  });

  it('preserves Sulfuras behavior even when Backstage passes and Aged Brie also match', () => {
    const item = updateItem(
      new Item('Sulfuras backstage passes for the Aged Brie tasting contest', 5, 80)
    );

    expect(item).toEqual({
      name: 'Sulfuras backstage passes for the Aged Brie tasting contest',
      sellIn: 5,
      quality: 80,
    });
  });
});
