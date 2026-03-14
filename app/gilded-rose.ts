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
        if (item.quality < 50) {
          item.quality += item.sellIn < 0 ? 2 : 1;
        }
        if (item.quality > 50) {
          item.quality = 50;
        }
        continue;
      }

      if (!item.name.startsWith('Backstage passes')) {
        if (item.quality > 0) {
          item.quality = item.quality - 1
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
          if (item.name.startsWith('Backstage passes')) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
          }
        }
      }
      if (item.sellIn < 0) {
        if (!item.name.startsWith('Backstage passes')) {
          if (item.quality > 0) {
            item.quality = item.quality - 1
          }
        } else {
          item.quality = item.quality - item.quality
        }
        if (item.quality < 50) {
          item.quality = item.quality + 1
        }
      }
    }

    return this.items;
  }
}
