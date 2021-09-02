/*
    RPG Paper Maker Copyright (C) 2017-2021 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/
import { Enum, Utils } from "../Common";
var ElementMapKind = Enum.ElementMapKind;
import { MapElement } from "./MapElement";
import { Datas, Scene } from "../index";
import { Vector3 } from "./Vector3";
import { Vector2 } from "./Vector2";
import { CustomGeometry } from "./CustomGeometry";
/** @class
 *  A sprite in the map.
 *  @extends MapElement
 *  @param {Record<string, any>} - [json=undefined] Json object describing the
 *  sprite
 */
class Sprite extends MapElement {
    constructor(json) {
        super();
        this.front = true;
        if (json) {
            this.read(json);
        }
    }
    /**
     *  Create a new sprite.
     *  @static
     *  @param {ElementMapKind} kind - The element map kind
     *  @param {number[]} texture - Texture UV coords
     */
    static create(kind, texture) {
        let sprite = new Sprite();
        sprite.kind = kind;
        sprite.textureRect = texture;
        return sprite;
    }
    /**
     *  Rotate a vertex around a specified center.
     *  @static
     *  @param {Vector3} vec - The vertex to rotate
     *  @param {Vector3} center - The center to rotate around
     *  @param {number} angle - The angle in degree
     *  @param {Vector3} axis - The vector axis
     */
    static rotateVertex(vec, center, angle, axis) {
        vec.sub(center);
        vec.applyAxisAngle(axis, angle * Math.PI / 180.0);
        vec.add(center);
    }
    /** Rotate the four vertices of a sprite around a specified center.
     *   @static
     *   @param {Vector3} vecA - The A vertex to rotate
     *   @param {Vector3} vecB - The B vertex to rotate
     *   @param {Vector3} vecC - The C vertex to rotate
     *   @param {Vector3} vecD - The D vertex to rotate
     *   @param {Vector3} center - The center to rotate around
     *   @param {number} angle - The angle in degree
     *   @param {Vector3} axis - The vector axis
     */
    static rotateSprite(vecA, vecB, vecC, vecD, center, angle, axis) {
        Sprite.rotateVertex(vecA, center, angle, axis);
        Sprite.rotateVertex(vecB, center, angle, axis);
        Sprite.rotateVertex(vecC, center, angle, axis);
        Sprite.rotateVertex(vecD, center, angle, axis);
    }
    /**
     *  Add a static sprite to the geometry.
     *  @static
     *  @param {THREE.Geometry} geometry - The geometry
     *  @param {Vector3} vecA - The A vertex
     *  @param {Vector3} vecB - The B vertex
     *  @param {Vector3} vecC - The C vertex
     *  @param {Vector3} vecD - The D vertex
     *  @param {Vector2} texA- The texture face A
     *  @param {Vector2} texB - The texture face B
     *  @param {number} count - The faces count
     *  @returns {number}
     */
    static addStaticSpriteToGeometry(geometry, vecA, vecB, vecC, vecD, texA, texB, texC, texD, count) {
        geometry.pushQuadVertices(vecA, vecB, vecC, vecD);
        geometry.pushQuadIndices(count);
        geometry.pushQuadUVs(texA, texB, texC, texD);
        return count + 4;
    }
    /**
     *  Read the JSON associated to the sprite.
     *  @param {Record<string, any>} - json Json object describing the sprite
     */
    read(json) {
        super.read(json);
        this.front = Utils.defaultValue(json.f, true);
        this.kind = json.k;
        this.textureRect = json.t;
    }
    /**
     *  Update the geometry associated to this.
     *  @param {Core.CustomGeometry} geometry - The geometry
     *  @param {number} width - The total texture width
     *  @param {number} height - The total texture height
     *  @param {number[]} position - The position
     *  @param {number} count - The faces count
     *  @param {boolean} tileset - Indicate if the texture is tileset
     *  @param {Vector3} localPosition - The local position
     *  @returns {any[]}
     */
    updateGeometry(geometry, width, height, position, count, tileset, localPosition) {
        let vecA = new Vector3(-0.5, 1.0, 0.0);
        let vecB = new Vector3(0.5, 1.0, 0.0);
        let vecC = new Vector3(0.5, 0.0, 0.0);
        let vecD = new Vector3(-0.5, 0.0, 0.0);
        let center = new Vector3(0, 0, 0);
        let size = new Vector3(this.textureRect[2] * Datas.Systems
            .SQUARE_SIZE, this.textureRect[3] * Datas.Systems.SQUARE_SIZE, 1.0);
        // For static sprites
        super.scale(vecA, vecB, vecC, vecD, center, position, size, this.kind);
        if (localPosition !== null) {
            vecA.add(localPosition);
            vecB.add(localPosition);
            vecC.add(localPosition);
            vecD.add(localPosition);
            center.add(localPosition);
        }
        else {
            localPosition = tileset ? position.toVector3() : new Vector3();
        }
        let angleY = position.angleY;
        let angleX = position.angleX;
        let angleZ = position.angleZ;
        if (this.kind !== ElementMapKind.SpritesFace) {
            if (angleY !== 0.0) {
                Sprite.rotateSprite(vecA, vecB, vecC, vecD, center, angleY, Sprite.Y_AXIS);
            }
            if (angleX !== 0.0) {
                Sprite.rotateSprite(vecA, vecB, vecC, vecD, center, angleX, Sprite.X_AXIS);
            }
            if (angleZ !== 0.0) {
                Sprite.rotateSprite(vecA, vecB, vecC, vecD, center, angleZ, Sprite.Z_AXIS);
            }
        }
        // Getting UV coordinates
        let x = (this.textureRect[0] * Datas.Systems.SQUARE_SIZE) / width;
        let y = (this.textureRect[1] * Datas.Systems.SQUARE_SIZE) / height;
        let w = (this.textureRect[2] * Datas.Systems.SQUARE_SIZE) / width;
        let h = (this.textureRect[3] * Datas.Systems.SQUARE_SIZE) / height;
        let coefX = MapElement.COEF_TEX / width;
        let coefY = MapElement.COEF_TEX / height;
        x += coefX;
        y += coefY;
        w -= (coefX * 2);
        h -= (coefY * 2);
        let texA = new Vector2();
        let texB = new Vector2();
        let texC = new Vector2();
        let texD = new Vector2();
        CustomGeometry.uvsQuadToTex(texA, texB, texC, texD, x, y, w, h);
        // Collision
        let objCollision = new Array;
        let twidth = Math.floor(this.textureRect[2] / 2);
        let theight = Math.floor(this.textureRect[3] / 2);
        if (tileset) {
            let collisions = Scene.Map.current.mapProperties.tileset.picture
                .getSquaresForTexture(this.textureRect);
            let rect;
            for (let i = 0, l = collisions.length; i < l; i++) {
                rect = collisions[i];
                objCollision.push({
                    p: position,
                    l: localPosition,
                    b: [
                        (localPosition.x - (Math.floor(this.textureRect[2] / 2)
                            * Datas.Systems.SQUARE_SIZE)) - ((this.textureRect[2] % 2) * Math.round(Datas.Systems.SQUARE_SIZE / 2))
                            + rect[0] + Math.round(rect[2] / 2),
                        localPosition.y + (this.textureRect[3] * Datas.Systems
                            .SQUARE_SIZE) - rect[1] - Math.round(rect[3] / 2),
                        localPosition.z,
                        rect[2],
                        rect[3],
                        1,
                        angleY,
                        angleX,
                        angleZ
                    ],
                    w: twidth,
                    h: theight,
                    k: this.kind === ElementMapKind.SpritesFix
                });
            }
        }
        else { // Character
            objCollision.push({
                b: null,
                w: twidth,
                h: theight,
                k: this.kind === ElementMapKind.SpritesFix
            });
        }
        // Simple sprite
        let vecSimpleA = vecA.clone();
        let vecSimpleB = vecB.clone();
        let vecSimpleC = vecC.clone();
        let vecSimpleD = vecD.clone();
        count = Sprite.addStaticSpriteToGeometry(geometry, vecSimpleA, vecSimpleB, vecSimpleC, vecSimpleD, texA, texB, texC, texD, count);
        // Double sprite
        if (this.kind === ElementMapKind.SpritesDouble || this.kind ===
            ElementMapKind.SpritesQuadra) {
            let vecDoubleA = vecA.clone();
            let vecDoubleB = vecB.clone();
            let vecDoubleC = vecC.clone();
            let vecDoubleD = vecD.clone();
            Sprite.rotateSprite(vecDoubleA, vecDoubleB, vecDoubleC, vecDoubleD, center, 90, Sprite.Y_AXIS);
            count = Sprite.addStaticSpriteToGeometry(geometry, vecDoubleA, vecDoubleB, vecDoubleC, vecDoubleD, texA, texB, texC, texD, count);
            // Quadra sprite
            if (this.kind === ElementMapKind.SpritesQuadra) {
                let vecQuadra1A = vecA.clone();
                let vecQuadra1B = vecB.clone();
                let vecQuadra1C = vecC.clone();
                let vecQuadra1D = vecD.clone();
                let vecQuadra2A = vecA.clone();
                let vecQuadra2B = vecB.clone();
                let vecQuadra2C = vecC.clone();
                let vecQuadra2D = vecD.clone();
                Sprite.rotateSprite(vecQuadra1A, vecQuadra1B, vecQuadra1C, vecQuadra1D, center, 45, Sprite.Y_AXIS);
                Sprite.rotateSprite(vecQuadra2A, vecQuadra2B, vecQuadra2C, vecQuadra2D, center, -45, Sprite.Y_AXIS);
                count = Sprite.addStaticSpriteToGeometry(geometry, vecQuadra1A, vecQuadra1B, vecQuadra1C, vecQuadra1D, texA, texB, texC, texD, count);
                count = Sprite.addStaticSpriteToGeometry(geometry, vecQuadra2A, vecQuadra2B, vecQuadra2C, vecQuadra2D, texA, texB, texC, texD, count);
            }
        }
        return [count, objCollision];
    }
    /**
     *  Create the geometry associated to this sprite
     *  @param {number} width - The texture total width
     *  @param {number} height - The texture total height
     *  @param {boolean} tileset - Indicate if the texture is tileset
     *  @param {Position} position - The position
     *  @returns {any[]}
     */
    createGeometry(width, height, tileset, position) {
        let geometry = new CustomGeometry;
        let collisions = this.updateGeometry(geometry, width, height, position, 0, tileset, null);
        geometry.updateAttributes();
        return [geometry, collisions];
    }
}
Sprite.Y_AXIS = new Vector3(0, 1, 0);
Sprite.X_AXIS = new Vector3(1, 0, 0);
Sprite.Z_AXIS = new Vector3(0, 0, 1);
export { Sprite };
