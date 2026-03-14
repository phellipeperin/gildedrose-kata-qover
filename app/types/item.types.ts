export interface QualityBounds {
  min: number;
  max: number;
}

export interface ItemRule {
  nameStartsWith: string;
  skipSellInUpdate?: boolean;
  qualityBounds: QualityBounds;
  qualityRules: ItemQualityUpdateRule[];
}

export interface ItemQualityUpdateRule {
  quality: ItemQualityRule;
  sellInLessThan?: number;
  sellInGreaterThanOrEqualTo?: number;
}

export interface ItemQualityRule {
  changeBy?: number;
  setTo?: number;
}
