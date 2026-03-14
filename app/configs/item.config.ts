import { ItemRule } from '../types/item.types';
import {
  DEFAULT_QUALITY_BOUNDS,
  LEGENDARY_QUALITY_BOUNDS,
} from './quality.config';

export const sulfurasRule: ItemRule = {
  nameIncludes: 'Sulfuras',
  skipSellInUpdate: true,
  qualityBounds: LEGENDARY_QUALITY_BOUNDS,
  qualityRules: [],
};

export const agedBrieRule: ItemRule = {
  nameIncludes: 'Aged Brie',
  qualityBounds: DEFAULT_QUALITY_BOUNDS,
  qualityRules: [
    {
      sellInGreaterThanOrEqualTo: 0,
      quality: { changeBy: 1 },
    },
    {
      sellInLessThan: 0,
      quality: { changeBy: 2 },
    },
  ],
};

export const backstagePassesRule: ItemRule = {
  nameIncludes: 'Backstage passes',
  qualityBounds: DEFAULT_QUALITY_BOUNDS,
  qualityRules: [
    {
      sellInLessThan: 0,
      quality: { setTo: 0 },
    },
    {
      sellInGreaterThanOrEqualTo: 0,
      sellInLessThan: 5,
      quality: { changeBy: 3 },
    },
    {
      sellInGreaterThanOrEqualTo: 5,
      sellInLessThan: 10,
      quality: { changeBy: 2 },
    },
    {
      sellInGreaterThanOrEqualTo: 10,
      quality: { changeBy: 1 },
    },
  ],
};

export const conjuredRule: ItemRule = {
  nameIncludes: 'Conjured',
  qualityBounds: DEFAULT_QUALITY_BOUNDS,
  qualityRules: [
    {
      sellInGreaterThanOrEqualTo: 0,
      quality: { changeBy: -2 },
    },
    {
      sellInLessThan: 0,
      quality: { changeBy: -4 },
    },
  ],
};

export const normalItemRule: ItemRule = {
  nameIncludes: '',
  qualityBounds: DEFAULT_QUALITY_BOUNDS,
  qualityRules: [
    {
      sellInGreaterThanOrEqualTo: 0,
      quality: { changeBy: -1 },
    },
    {
      sellInLessThan: 0,
      quality: { changeBy: -2 },
    },
  ],
};

const itemConfigs: ItemRule[] = [
  sulfurasRule,
  conjuredRule,
  backstagePassesRule,
  agedBrieRule,
];

export { itemConfigs };
export default itemConfigs;
