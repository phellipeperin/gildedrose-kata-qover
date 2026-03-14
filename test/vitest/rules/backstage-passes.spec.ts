import { Item } from '@/gilded-rose';
import { updateItem } from '../support/gilded-rose-test-helpers';

describe('Backstage passes', () => {
  it('increase in quality by 1 when there are more than 10 days left', () => {
    const item = updateItem(
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)
    );

    expect(item).toEqual({
      name: 'Backstage passes to a TAFKAL80ETC concert',
      sellIn: 14,
      quality: 21,
    });
  });

  it('increase in quality by 2 when there are 10 days or less left', () => {
    const item = updateItem(
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)
    );

    expect(item).toEqual({
      name: 'Backstage passes to a TAFKAL80ETC concert',
      sellIn: 9,
      quality: 22,
    });
  });

  it('increase in quality by 3 when there are 5 days or less left', () => {
    const item = updateItem(
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)
    );

    expect(item).toEqual({
      name: 'Backstage passes to a TAFKAL80ETC concert',
      sellIn: 4,
      quality: 23,
    });
  });

  it('drop to 0 quality after the concert', () => {
    const item = updateItem(
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)
    );

    expect(item).toEqual({
      name: 'Backstage passes to a TAFKAL80ETC concert',
      sellIn: -1,
      quality: 0,
    });
  });

  it('stay at 0 quality when already past the concert', () => {
    const item = updateItem(
      new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0)
    );

    expect(item).toEqual({
      name: 'Backstage passes to a TAFKAL80ETC concert',
      sellIn: -2,
      quality: 0,
    });
  });

  it('never increase above quality 50 in the 10-day window', () => {
    const item = updateItem(
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49)
    );

    expect(item).toEqual({
      name: 'Backstage passes to a TAFKAL80ETC concert',
      sellIn: 9,
      quality: 50,
    });
  });

  it('never increase above quality 50 in the 5-day window', () => {
    const item = updateItem(
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)
    );

    expect(item).toEqual({
      name: 'Backstage passes to a TAFKAL80ETC concert',
      sellIn: 4,
      quality: 50,
    });
  });

  it('treats "Backstage passes to the Great Orc Band show" like a backstage pass with more than 10 days left', () => {
    const item = updateItem(
      new Item('Backstage passes to the Great Orc Band show', 15, 20)
    );

    expect(item).toEqual({
      name: 'Backstage passes to the Great Orc Band show',
      sellIn: 14,
      quality: 21,
    });
  });

  it('treats "Backstage passes to the Great Orc Band show" like a backstage pass with 10 days left', () => {
    const item = updateItem(
      new Item('Backstage passes to the Great Orc Band show', 10, 20)
    );

    expect(item).toEqual({
      name: 'Backstage passes to the Great Orc Band show',
      sellIn: 9,
      quality: 22,
    });
  });

  it('treats "Backstage passes to the Great Orc Band show" like a backstage pass with 5 days left', () => {
    const item = updateItem(
      new Item('Backstage passes to the Great Orc Band show', 5, 20)
    );

    expect(item).toEqual({
      name: 'Backstage passes to the Great Orc Band show',
      sellIn: 4,
      quality: 23,
    });
  });

  it('drops "Backstage passes to the Great Orc Band show" to 0 quality after the concert', () => {
    const item = updateItem(
      new Item('Backstage passes to the Great Orc Band show', 0, 20)
    );

    expect(item).toEqual({
      name: 'Backstage passes to the Great Orc Band show',
      sellIn: -1,
      quality: 0,
    });
  });
});
