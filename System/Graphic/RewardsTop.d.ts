import { Base } from "./Base";
import { Graphic } from "..";
/** @class
 *  The graphic displaying all experience + currencies
 */
declare class RewardsTop extends Base {
    graphicXP: Graphic.Text;
    graphicXPLength: number;
    graphicCurrencies: Graphic.TextIcon[];
    constructor(xp: number, currencies: Record<string, number>);
    /**
     *  Drawing the progression.
     *  @param {number} x - The x position to draw graphic
     *  @param {number} y - The y position to draw graphic
     *  @param {number} w - The width dimention to draw graphic
     *  @param {number} h - The height dimention to draw graphic
     */
    drawChoice(x: number, y: number, w: number, h: number): void;
    /**
     *  Drawing the progression.
     *  @param {number} x - The x position to draw graphic
     *  @param {number} y - The y position to draw graphic
     *  @param {number} w - The width dimention to draw graphic
     *  @param {number} h - The height dimention to draw graphic
     */
    draw(x: number, y: number, w: number, h: number): void;
}
export { RewardsTop };
