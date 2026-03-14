import {
  applyQualityRule,
  findItemRule,
  findQualityRule,
} from './utils/gilded-rose.utils';

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
      const itemRule = findItemRule(item);

      if (!itemRule.skipSellInUpdate) {
        item.sellIn -= 1;
      }

      const qualityRule = findQualityRule(itemRule, item.sellIn);

      if (qualityRule) {
        item.quality = applyQualityRule(
          item.quality,
          qualityRule.quality,
          itemRule.qualityBounds
        );
      }
    }

    return this.items;
  }
}
