import { Battler } from ".";
import { System } from "..";
import { Enum } from "../Common";
import { Picture2D } from "./Picture2D";
/** @class
 *  An animation instance.
 *  @param {number} id - The ID of the status
 */
declare class Animation {
    system: System.Animation;
    picture: Picture2D;
    frame: number;
    loop: boolean;
    constructor(id: number, loop?: boolean);
    /**
     *  Update frame.
     */
    update(): void;
    /**
     *  Draw the animation on top of battler.
     */
    playSounds(conditionKind: Enum.AnimationEffectConditionKind): void;
    /**
     *  Draw the animation on top of battler.
     */
    draw(battler: Battler): void;
}
export { Animation };
