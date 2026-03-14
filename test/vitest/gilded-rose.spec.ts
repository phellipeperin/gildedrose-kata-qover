import { Item, GildedRose } from '@/gilded-rose';

const toState = (item: Item) => ({
  name: item.name,
  sellIn: item.sellIn,
  quality: item.quality,
});

const updateItem = (item: Item) => {
  const [updatedItem] = new GildedRose([item]).updateQuality();
  return toState(updatedItem);
};

describe('Gilded Rose', () => {
  describe('normal items', () => {
    it('decreases sellIn and quality by 1 before the sell date', () => {
      const item = updateItem(new Item('+5 Dexterity Vest', 10, 20));

      expect(item).toMatchObject({
        name: '+5 Dexterity Vest',
        sellIn: 9,
        quality: 19,
      });
    });

    it('decreases quality twice as fast once the sell date has passed', () => {
      const item = updateItem(new Item('+5 Dexterity Vest', 0, 20));

      expect(item).toMatchObject({
        name: '+5 Dexterity Vest',
        sellIn: -1,
        quality: 18,
      });
    });

    it('never makes quality negative before the sell date', () => {
      const item = updateItem(new Item('+5 Dexterity Vest', 10, 0));

      expect(item).toMatchObject({
        name: '+5 Dexterity Vest',
        sellIn: 9,
        quality: 0,
      });
    });

    it('never makes quality negative after the sell date has passed', () => {
      const item = updateItem(new Item('+5 Dexterity Vest', 0, 1));

      expect(item).toMatchObject({
        name: '+5 Dexterity Vest',
        sellIn: -1,
        quality: 0,
      });
    });
  });

  describe('Aged Brie', () => {
    it('increases in quality by 1 before the sell date', () => {
      const item = updateItem(new Item('Aged Brie', 5, 10));

      expect(item).toMatchObject({
        name: 'Aged Brie',
        sellIn: 4,
        quality: 11,
      });
    });

    it('increases in quality by 2 after the sell date has passed', () => {
      const item = updateItem(new Item('Aged Brie', 0, 10));

      expect(item).toMatchObject({
        name: 'Aged Brie',
        sellIn: -1,
        quality: 12,
      });
    });

    it('never increases above quality 50 before the sell date', () => {
      const item = updateItem(new Item('Aged Brie', 5, 50));

      expect(item).toMatchObject({
        name: 'Aged Brie',
        sellIn: 4,
        quality: 50,
      });
    });

    it('never increases above quality 50 after the sell date has passed', () => {
      const item = updateItem(new Item('Aged Brie', 0, 49));

      expect(item).toMatchObject({
        name: 'Aged Brie',
        sellIn: -1,
        quality: 50,
      });
    });
  });

  describe('Sulfuras', () => {
    it('never changes quality', () => {
      const item = updateItem(new Item('Sulfuras, Hand of Ragnaros', 5, 80));

      expect(item).toMatchObject({
        name: 'Sulfuras, Hand of Ragnaros',
        sellIn: 5,
        quality: 80,
      });
    });

    it('never changes sellIn, even when the sell date is already passed', () => {
      const item = updateItem(new Item('Sulfuras, Hand of Ragnaros', -1, 80));

      expect(item).toMatchObject({
        name: 'Sulfuras, Hand of Ragnaros',
        sellIn: -1,
        quality: 80,
      });
    });
  });

  describe('Backstage passes', () => {
    it('increases in quality by 1 when there are more than 10 days left', () => {
      const item = updateItem(
        new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)
      );

      expect(item).toMatchObject({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 14,
        quality: 21,
      });
    });

    it('increases in quality by 2 when there are 10 days or less left', () => {
      const item = updateItem(
        new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)
      );

      expect(item).toMatchObject({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 9,
        quality: 22,
      });
    });

    it('increases in quality by 3 when there are 5 days or less left', () => {
      const item = updateItem(
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)
      );

      expect(item).toMatchObject({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 4,
        quality: 23,
      });
    });

    it('drops to 0 quality after the concert', () => {
      const item = updateItem(
        new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)
      );

      expect(item).toMatchObject({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: -1,
        quality: 0,
      });
    });

    it('stays at 0 quality when already past the concert', () => {
      const item = updateItem(
        new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0)
      );

      expect(item).toMatchObject({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: -2,
        quality: 0,
      });
    });

    it('never increases above quality 50 in the 10-day window', () => {
      const item = updateItem(
        new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49)
      );

      expect(item).toMatchObject({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 9,
        quality: 50,
      });
    });

    it('never increases above quality 50 in the 5-day window', () => {
      const item = updateItem(
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)
      );

      expect(item).toMatchObject({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 4,
        quality: 50,
      });
    });
  });

  describe('Conjured items', () => {
    it('decrease in quality by 2 before the sell date', () => {
      const item = updateItem(new Item('Conjured Mana Cake', 3, 6));

      expect(item).toMatchObject({
        name: 'Conjured Mana Cake',
        sellIn: 2,
        quality: 4,
      });
    });

    it('decrease in quality by 4 after the sell date has passed', () => {
      const item = updateItem(new Item('Conjured Mana Cake', 0, 6));

      expect(item).toMatchObject({
        name: 'Conjured Mana Cake',
        sellIn: -1,
        quality: 2,
      });
    });

    it('never makes quality negative before the sell date', () => {
      const item = updateItem(new Item('Conjured Mana Cake', 3, 1));

      expect(item).toMatchObject({
        name: 'Conjured Mana Cake',
        sellIn: 2,
        quality: 0,
      });
    });

    it('never makes quality negative after the sell date has passed', () => {
      const item = updateItem(new Item('Conjured Mana Cake', 0, 3));

      expect(item).toMatchObject({
        name: 'Conjured Mana Cake',
        sellIn: -1,
        quality: 0,
      });
    });
  });

  describe('mixed inventory updates', () => {
    it('updates each item according to its own rules in a single pass', () => {
      const items = [
        new Item('+5 Dexterity Vest', 10, 20),
        new Item('Aged Brie', 2, 0),
        new Item('Sulfuras, Hand of Ragnaros', 0, 80),
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
        new Item('Conjured Mana Cake', 3, 6),
      ];

      const updatedItems = new GildedRose(items).updateQuality();

      expect(updatedItems.map(toState)).toEqual([
        { name: '+5 Dexterity Vest', sellIn: 9, quality: 19 },
        { name: 'Aged Brie', sellIn: 1, quality: 1 },
        { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: 4,
          quality: 50,
        },
        { name: 'Conjured Mana Cake', sellIn: 2, quality: 4 },
      ]);
    });
  });
});
