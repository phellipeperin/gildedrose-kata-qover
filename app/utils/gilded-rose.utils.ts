import itemConfigs, { normalItemRule } from '../configs/item.config';
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

export const findItemRules = (item: Item): ItemRule[] => {
  const matchedRules = itemConfigs.filter((rule) =>
    item.name.includes(rule.nameIncludes)
  );

  if (matchedRules.length === 0) {
    return [normalItemRule];
  }

  return matchedRules;
};

export const findQualityRule = (
  itemRule: ItemRule,
  sellIn: number
): ItemQualityUpdateRule | undefined =>
  itemRule.qualityRules.find((rule) => matchesSellInWindow(rule, sellIn));
