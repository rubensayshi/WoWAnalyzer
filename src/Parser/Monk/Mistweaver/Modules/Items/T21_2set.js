import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';
import SpellIcon from 'common/SpellIcon';
import AbilityTracker from 'Parser/Core/Modules/AbilityTracker';
import Analyzer from 'Parser/Core/Analyzer';
import ItemHealingDone from 'Interface/Others/ItemHealingDone';

class T21_2set extends Analyzer {
  static dependencies = {
    abilityTracker: AbilityTracker,
  };

  tranquilMistCount = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasBuff(SPELLS.CHIJIS_BATTLEGEAR_2_PIECE_BUFF.id);
  }

  on_byPlayer_applybuff(event) {
    const spellId = event.ability.guid;

    if (spellId === SPELLS.TRANQUIL_MIST.id) {
      this.tranquilMistCount += 1;
    }
  }

  on_byPlayer_refreshbuff(event) {
    const spellId = event.ability.guid;

    if (spellId === SPELLS.TRANQUIL_MIST.id) {
      this.tranquilMistCount += 1;
    }
  }

  item() {
    const tranquilMist = this.abilityTracker.getAbility(SPELLS.TRANQUIL_MIST.id);
    const healing = tranquilMist.healingEffective;
    return {
      id: `spell-${SPELLS.CHIJIS_BATTLEGEAR_2_PIECE_BUFF.id}`,
      icon: <SpellIcon id={SPELLS.CHIJIS_BATTLEGEAR_2_PIECE_BUFF.id} />,
      title: <SpellLink id={SPELLS.CHIJIS_BATTLEGEAR_2_PIECE_BUFF.id} icon={false} />,
      result: <ItemHealingDone amount={healing} />,
    };
  }
}

export default T21_2set;
