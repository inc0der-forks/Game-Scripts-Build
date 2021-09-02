import { Base } from "./Base";
import { MapObject } from "../Core";
/** @class
 *  An event command for ending the battle.
 *  @extends EventCommand.Base
*/
declare class EndBattle extends Base {
    constructor(command: any[]);
    /**
     *  Update and check if the event is finished.
     *  @param {Record<string, any>} - currentState The current state of the event
     *  @param {MapObject} object - The current object reacting
     *  @param {number} state - The state ID
     *  @returns {number} The number of node to pass
     */
    update(currentState: Record<string, any>, object: MapObject, state: number): number;
}
export { EndBattle };
