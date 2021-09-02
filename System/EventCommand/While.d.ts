import { Base } from "./Base";
import { MapObject } from "../Core";
/** @class
 *  An event command for loop event command block.
 *  @extends EventCommand.Base
 *  @param {any[]} command - Direct JSON command to parse
 */
declare class While extends Base {
    constructor(command: any[]);
    /**
     *  Update and check if the event is finished
     *  @param {Record<string, any>} - currentState The current state of the event
     *  @param {MapObject} object - The current object reacting
     *  @param {number} state - The state ID
     *  @returns {number} The number of node to pass
     */
    update(currentState: Record<string, any>, object: MapObject, state: number): number;
    /**
     *  Get the number of nodes to pass.
     *  @returns {number}
     */
    goToNextCommand(): number;
}
export { While };
