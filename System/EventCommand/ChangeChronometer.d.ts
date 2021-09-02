import { Base } from "./Base";
import { System } from "../index";
import { MapObject } from "../Core";
/** @class
 *  An event command for changing chronometer.
 *  @extends EventCommand.Base
 *  @param {Object} command - Direct JSON command to parse
 */
declare class ChangeChronometer extends Base {
    chronometerID: System.DynamicValue;
    operation: number;
    time: System.DynamicValue;
    diplayOnScreen: boolean;
    stockValue: boolean;
    stockID: System.DynamicValue;
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
export { ChangeChronometer };
