import colorData from '../scraper/colors.json';
import { FilterOptions } from '@/FilterOptions';

class ColorStore {
  private colorList = colorData.colors;

  public colors(filterOptions: FilterOptions) {
    return this.colorList.filter( (item) => {
      if (filterOptions.coolColorsOnly) {
        return item.is_cool
      }

      return true;
    });
  }
}

export { ColorStore };
