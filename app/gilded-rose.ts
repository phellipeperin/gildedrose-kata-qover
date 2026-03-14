import { MIN_QUALITY, MAX_QUALITY } from './configs/quality.config';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      if (item.name.startsWith('Sulfuras')) {
        continue;
      }

      if (item.name.startsWith('Aged Brie')) {
        item.sellIn = item.sellIn - 1;
        if (item.quality < MAX_QUALITY) {
          item.quality += item.sellIn < 0 ? 2 : 1;
        }
        if (item.quality > MAX_QUALITY) {
          item.quality = MAX_QUALITY;
        }
        continue;
      }

      if (item.name.startsWith('Backstage passes')) {
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          item.quality = MIN_QUALITY;
        } else if (item.sellIn < 5) {
          item.quality = Math.min(item.quality + 3, MAX_QUALITY);
        } else if (item.sellIn < 10) {
          item.quality = Math.min(item.quality + 2, MAX_QUALITY);
        } else {
          item.quality = Math.min(item.quality + 1, MAX_QUALITY);
        }
        continue;
      }

      // Normal and Conjured items
      item.sellIn = item.sellIn - 1;
      const degradation = item.name.startsWith('Conjured') ? 2 : 1;
      item.quality = item.quality - (item.sellIn < 0 ? degradation * 2 : degradation);
      if (item.quality < MIN_QUALITY) {
        item.quality = MIN_QUALITY;
      }
    }

    return this.items;
  }
}
