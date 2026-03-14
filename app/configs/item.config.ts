import { ItemRule } from '../types/item.types';
import {
  DEFAULT_QUALITY_BOUNDS,
  LEGENDARY_QUALITY_BOUNDS,
} from './quality.config';

export const sulfurasRule: ItemRule = {
  nameStartsWith: 'Sulfuras',
  skipSellInUpdate: true,
  qualityBounds: LEGENDARY_QUALITY_BOUNDS,
  qualityRules: [],
};

export const agedBrieRule: ItemRule = {
  nameStartsWith: 'Aged Brie',
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
  nameStartsWith: 'Backstage passes',
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
  nameStartsWith: 'Conjured',
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
  nameStartsWith: '',
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
  agedBrieRule,
  backstagePassesRule,
  conjuredRule,
  normalItemRule,
];

export { itemConfigs };
export default itemConfigs;
