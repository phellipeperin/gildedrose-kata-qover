import itemConfigs from '../configs/item.config';
import type { Item } from '../gilded-rose';
import {
  ItemQualityRule,
  ItemQualityUpdateRule,
  ItemRule,
  QualityBounds,
} from '../types/item.types';

const matchesSellInWindow = (
  rule: ItemQualityUpdateRule,
  sellIn: number
): boolean => {
  if (
    (rule.sellInGreaterThanOrEqualTo !== undefined &&
      sellIn < rule.sellInGreaterThanOrEqualTo) ||
    (rule.sellInLessThan !== undefined && sellIn >= rule.sellInLessThan)
  ) {
    return false;
  }

  return true;
};

export const clampQuality = (
  quality: number,
  bounds: QualityBounds
): number => Math.min(Math.max(quality, bounds.min), bounds.max);

export const applyQualityRule = (
  quality: number,
  rule: ItemQualityRule,
  bounds: QualityBounds
): number => {
  if (rule.setTo !== undefined) {
    return clampQuality(rule.setTo, bounds);
  }

  return clampQuality(quality + (rule.changeBy ?? 0), bounds);
};

export const findItemRule = (item: Item): ItemRule => {
  const matchedRule = itemConfigs.find((rule) =>
    item.name.startsWith(rule.nameStartsWith)
  );

  if (!matchedRule) {
    throw new Error(`No item rule found for "${item.name}"`);
  }

  return matchedRule;
};

export const findQualityRule = (
  itemRule: ItemRule,
  sellIn: number
): ItemQualityUpdateRule | undefined =>
  itemRule.qualityRules.find((rule) => matchesSellInWindow(rule, sellIn));
