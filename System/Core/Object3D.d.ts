import { System } from "../index";
import { CustomGeometry } from "./CustomGeometry";
import { StructMapElementCollision, MapElement } from "./MapElement";
import { Position } from "./Position";
import { Vector3 } from "./Vector3";
/** @class
 *  The abstract class who model the Structure of RPM datas.
 *  @extends MapElement
 */
declare abstract class Object3D extends MapElement {
    abstract id: number;
    abstract datas: System.Object3D;
    constructor();
    /**
     *  Read the JSON associated to the object 3D.
     *  @param {Record<string, any>} json - Json object describing the object 3D
     */
    read(json: Record<string, any>): void;
    /**
     *  Get the center vector.
     *  @returns {Vector3}
     */
    abstract getCenterVector(): Vector3;
    /**
     *  Update the geometry of a group of object 3D with the same material.
     *  @param {Core.CustomGeometry} geometry - Geometry of the object 3D
     *  @param {Position} position - The position of object 3D
     *  @param {number} count - The faces count
     *  @return {any[]}
     */
    abstract updateGeometry(geometry: CustomGeometry, position: Position, count: number): [number, StructMapElementCollision[]];
}
export { Object3D };
