import {
  applyQualityRule,
  findItemRules,
  findQualityRule,
} from './utils/gilded-rose.utils';
import type { ItemQualityUpdateRule } from './types/item.types';

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
      const itemRules = findItemRules(item);
      const priorityRule = itemRules[0];

      if (!priorityRule.skipSellInUpdate) {
        item.sellIn -= 1;
      }

      const qualityRules = itemRules
        .reduce((rules, itemRule) => {
          const qualityRule = findQualityRule(itemRule, item.sellIn);

          if (qualityRule) {
            rules.push(qualityRule);
          }

          return rules;
        }, [] as ItemQualityUpdateRule[])
        .reverse();

      for (const qualityRule of qualityRules) {
        item.quality = applyQualityRule(
          item.quality,
          qualityRule.quality,
          priorityRule.qualityBounds
        );
      }
    }

    return this.items;
  }
}
