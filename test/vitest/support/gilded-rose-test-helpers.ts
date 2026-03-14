import { Item, GildedRose } from '@/gilded-rose';

export type ItemState = {
  name: string;
  sellIn: number;
  quality: number;
};

export const toState = (item: Item): ItemState => ({
  name: item.name,
  sellIn: item.sellIn,
  quality: item.quality,
});

export const updateItem = (item: Item): ItemState => {
  const [updatedItem] = new GildedRose([item]).updateQuality();
  return toState(updatedItem);
};
