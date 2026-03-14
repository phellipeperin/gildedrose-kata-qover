import { DEFAULT_QUALITY_BOUNDS } from '@/configs/quality.config';
import { applyQualityRule } from '@/utils/gilded-rose.utils';

describe('Gilded Rose utils', () => {
  it('keeps quality unchanged when a quality rule has neither setTo nor changeBy', () => {
    const updatedQuality = applyQualityRule(10, {}, DEFAULT_QUALITY_BOUNDS);

    expect(updatedQuality).toBe(10);
  });
});
