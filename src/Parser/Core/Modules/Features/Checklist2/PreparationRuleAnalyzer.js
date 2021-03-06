import Analyzer from 'Parser/Core/Analyzer';
import LegendaryUpgradeChecker from 'Parser/Core/Modules/Items/LegendaryUpgradeChecker';
import LegendaryCountChecker from 'Parser/Core/Modules/Items/LegendaryCountChecker';
import PrePotion from 'Parser/Core/Modules/Items/PrePotion';
import EnchantChecker from 'Parser/Core/Modules/Items/EnchantChecker';


class PreparationRuleAnalyzer extends Analyzer {
  static dependencies = {
    legendaryUpgradeChecker: LegendaryUpgradeChecker,
    legendaryCountChecker: LegendaryCountChecker,
    prePotion: PrePotion,
    enchantChecker: EnchantChecker,
  };

  get thresholds() {
    return {
      legendariesEquipped: {
        actual: this.legendaryCountChecker.equipped,
        max: this.legendaryCountChecker.max,
        isLessThan: this.legendaryCountChecker.max,
        style: 'number',
      },
      legendariesUpgraded: {
        actual: this.legendaryUpgradeChecker.upgradedLegendaries.length,
        max: this.legendaryCountChecker.max,
        isLessThan: this.legendaryCountChecker.max,
        style: 'number',
      },
      prePotion: this.prePotion.prePotionSuggestionThresholds,
      secondPotion: this.prePotion.secondPotionSuggestionThresholds,
      itemsEnchanted: {
        actual: this.enchantChecker.numEnchantableGear - this.enchantChecker.numSlotsMissingEnchant,
        max: this.enchantChecker.numEnchantableGear,
        isLessThan: this.enchantChecker.numEnchantableGear,
        style: 'number',
      },
      itemsBestEnchanted: {
        // numSlotsMissingMaxEnchant doesn't include items without an enchant at all
        actual: this.enchantChecker.numEnchantableGear - this.enchantChecker.numSlotsMissingEnchant - this.enchantChecker.numSlotsMissingMaxEnchant,
        max: this.enchantChecker.numEnchantableGear,
        isLessThan: this.enchantChecker.numEnchantableGear,
        style: 'number',
      },

    };
  }
  
}

export default PreparationRuleAnalyzer;
