import { Translatable } from "./Translatable";
import { Enum } from "../Common";
import TitleCommandKind = Enum.TitleCommandKind;
/** @class
 *  A title command of the game.
 *  @extends System.Translatable
 *  @param {Record<string, any>} - [json=undefined] Json object describing the
 *  title screen command
 */
declare class TitleCommand extends Translatable {
    kind: TitleCommandKind;
    script: string;
    constructor(json?: Record<string, any>);
    /**
     *  Read the JSON associated to the title screen command.
     *  @param {Record<string, any>} - json Json object describing the title
     *  screen command
     */
    read(json: Record<string, any>): void;
    /**
     *  Get the action function according to kind.
     *  @returns {Function}
     */
    getAction(): Function;
    /**
     *  Callback function for start a new game.
     *  @returns {boolean}
     */
    startNewGame(): boolean;
    /**
     *  Callback function for loading an existing game.
     *  @returns {boolean}
     */
    loadGame(): boolean;
    /**
     *  Callback function for loading an existing game.
     *   @returns {boolean}
     */
    showSettings(): boolean;
    /**
     *  Callback function for closing the window.
     *  @returns {boolean}
     */
    exit(): boolean;
    /**
     *  Callback function for closing the window.
     *  @returns {boolean}
     */
    executeScript(): boolean;
}
export { TitleCommand };
