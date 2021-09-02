import { Enum } from "../Common";
import { Icon } from "./Icon";
import { Translatable } from "./Translatable";
import { DynamicValue } from "./DynamicValue";
import { PlaySong } from "./PlaySong";
import { Cost } from "./Cost";
import { Characteristic } from "./Characteristic";
import { Effect } from "./Effect";
import { System } from "../index";
import { Player } from "../Core";
/** @class
 *  A common class for skills, items, weapons, armors.
 *  @extends System.Icon
 *  @param {Record<string, any>} - [json=undefined] Json object describing the common
 */
declare class CommonSkillItem extends Icon {
    id: number;
    hasType: boolean;
    hasTargetKind: boolean;
    type: number;
    consumable: boolean;
    oneHand: boolean;
    description: Translatable;
    targetKind: Enum.TargetKind;
    targetConditionFormula: DynamicValue;
    conditionFormula: DynamicValue;
    availableKind: number;
    sound: PlaySong;
    animationID: DynamicValue;
    animationTargetID: DynamicValue;
    canBeSold: System.DynamicValue;
    price: Cost[];
    costs: Cost[];
    effects: Effect[];
    characteristics: Characteristic[];
    animationUserID: DynamicValue;
    constructor(json?: Record<string, any>);
    /**
     *  Read the JSON associated to the common.
     *  @param {Record<string, any>} - json Json object describing the common
     */
    read(json: Record<string, any>): void;
    /**
     *  Get all the effects, including the ones with perform skill efect.
     *  @returns {System.Effect}
     */
    getEffects(): System.Effect[];
    /**
     *  Use the command if possible.
     *  @returns {boolean}
     */
    useCommand(): boolean;
    /**
     *  Execute the effects and costs.
     *  @param {useCost}
     *  @returns {boolean}
     */
    use(useCost?: boolean): boolean;
    /**
     *  Use the costs.
     */
    cost(): void;
    /** Check if the costs are possible.
     *  @returns {boolean}
     */
    isPossible(target?: Player, checkCost?: boolean): boolean;
    /**
     *  Get the target kind string.
     *  @returns {string}
     */
    getTargetKindString(): string;
    /**
     *  Get the weapon kind.
     *  @returns {System/WeaponArmorKind}
     */
    getType(): System.WeaponArmorKind;
    /**
     *  Get the price.
     *  @returns {number}
     */
    getPrice(): Record<string, number>;
    /**
     *  Get the item kind.
     *  @returns {Enum.ItemKind}
     */
    getKind(): Enum.ItemKind;
    /**
     *  Check if is weapon.
     *  @returns {boolean}
     */
    isWeapon(): boolean;
    /**
     *  Check if is armor.
     *  @returns {boolean}
     */
    isArmor(): boolean;
    /**
     *  Check if is weapon or armor.
     *  @returns {boolean}
     */
    isWeaponArmor(): boolean;
}
export { CommonSkillItem };
