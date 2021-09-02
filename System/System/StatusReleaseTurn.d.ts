import { System } from "..";
import { Enum } from "../Common";
import { Base } from "./Base";
/** @class
 *  A possible status release turn condition hero.
 *  @extends System.Base
 *  @param {Record<string, any>} - json Json object describing the object state
 */
declare class StatusReleaseTurn extends Base {
    operationTurnKind: Enum.OperationKind;
    turn: System.DynamicValue;
    chance: System.DynamicValue;
    constructor(json?: Record<string, any>);
    /**
     *  Read the JSON associated to the status release turn.
     *  @param {Record<string, any>} - json Json object describing the status
     *  release turn
     */
    read(json: Record<string, any>): void;
}
export { StatusReleaseTurn };
