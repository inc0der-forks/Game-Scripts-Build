/*
    RPG Paper Maker Copyright (C) 2017-2021 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/
import { Datas } from "../index";
import { Sprite } from "./Sprite";
import { Enum } from "../Common";
var ObjectCollisionKind = Enum.ObjectCollisionKind;
import { Object3D } from "./Object3D";
import { Vector3 } from "./Vector3";
import { Vector2 } from "./Vector2";
import { CustomGeometry } from "./CustomGeometry";
/**
 * A 3D object box in the map.
 *
 * @class Object3DBox
 * @extends {Object3D}
 */
class Object3DBox extends Object3D {
    constructor(json, datas) {
        super();
        this.datas = datas;
        if (json) {
            this.read(json);
        }
    }
    /**
     *  Create a new 3D object box.
     *  @static
     *  @param {System.Object3D} datas - The object datas
     *  @returns {Core.Object3DBox}
     */
    static create(datas) {
        let object = new Object3DBox(undefined, datas);
        object.id = datas.id;
        return object;
    }
    /**
     *  Read the JSON associated to the object 3D box.
     *  @param {Record<string, any>} json - Json object describing the object 3D
     *  box
    */
    read(json) {
        super.read(json);
        this.id = this.datas.id;
    }
    /**
     *  Get the center vector.
     *  @returns {Vector3}
     */
    getCenterVector() {
        return new Vector3(this.datas.widthPixels() / 2, this.datas
            .heightPixels() / 2, this.datas.depthPixels() / 2);
    }
    /**
     *  Update the geometry of a group of object 3D with the same material.
     *  @param {Core.CustomGeometry} geometry - Geometry of the object 3D
     *  @param {Position} position - The position of object 3D
     *  @param {number} count - The faces count
     *  @return {number[]}
    */
    updateGeometry(geometry, position, count) {
        let coef = 0.01;
        let localPosition = position.toVector3(false);
        localPosition.setX(localPosition.x + coef);
        localPosition.setY(localPosition.y + coef);
        localPosition.setZ(localPosition.z + coef);
        let angleY = position.angleY;
        let angleX = position.angleX;
        let angleZ = position.angleZ;
        let size = this.datas.getSizeVector();
        let center = new Vector3(localPosition.x + Math.floor(Datas
            .Systems.SQUARE_SIZE / 2), localPosition.y + (size.y / 2), localPosition.z + Math.floor(Datas.Systems.SQUARE_SIZE / 2));
        let centerReal = new Vector3(localPosition.x + Math.floor(size.x /
            2), localPosition.y + (size.y / 2), localPosition.z + Math.floor(size.z / 2));
        Sprite.rotateVertex(centerReal, center, angleY, Sprite.Y_AXIS);
        Sprite.rotateVertex(centerReal, center, angleX, Sprite.X_AXIS);
        Sprite.rotateVertex(centerReal, center, angleZ, Sprite.Z_AXIS);
        size.setX(size.x - (2 * coef));
        size.setY(size.y - (2 * coef));
        size.setZ(size.z - (2 * coef));
        let w = this.datas.widthPixels();
        let h = this.datas.heightPixels();
        let d = this.datas.depthPixels();
        // Textures
        let textures = Object3DBox.TEXTURES_VALUES.slice(0);
        if (!this.datas.stretch) {
            let totalX = (d * 2) + (w * 2);
            let totalY = (d * 2) + h;
            textures[1] = d / totalX;
            textures[2] = (d + w) / totalX;
            textures[3] = ((2 * d) + w) / totalX;
            textures[5] = d / totalY;
            textures[6] = (d + h) / totalY;
        }
        // Vertices + faces / indexes
        let vecA, vecB, vecC, vecD, tA, tB, tC, tD, texA, texB, texC, texD;
        for (let i = 0; i < Object3DBox.NB_VERTICES; i += 4) {
            vecA = Object3DBox.VERTICES[i].clone();
            vecB = Object3DBox.VERTICES[i + 1].clone();
            vecC = Object3DBox.VERTICES[i + 2].clone();
            vecD = Object3DBox.VERTICES[i + 3].clone();
            vecA.multiply(size);
            vecB.multiply(size);
            vecC.multiply(size);
            vecD.multiply(size);
            vecA.add(localPosition);
            vecB.add(localPosition);
            vecC.add(localPosition);
            vecD.add(localPosition);
            tA = Object3DBox.TEXTURES[i];
            tB = Object3DBox.TEXTURES[i + 1];
            tC = Object3DBox.TEXTURES[i + 2];
            tD = Object3DBox.TEXTURES[i + 3];
            texA = new Vector2(textures[tA[0]], textures[tA[1]]);
            texB = new Vector2(textures[tB[0]], textures[tB[1]]);
            texC = new Vector2(textures[tC[0]], textures[tC[1]]);
            texD = new Vector2(textures[tD[0]], textures[tD[1]]);
            if (angleY !== 0.0) {
                Sprite.rotateSprite(vecA, vecB, vecC, vecD, center, angleY, Sprite.Y_AXIS);
            }
            if (angleX !== 0.0) {
                Sprite.rotateSprite(vecA, vecB, vecC, vecD, center, angleX, Sprite.X_AXIS);
            }
            if (angleZ !== 0.0) {
                Sprite.rotateSprite(vecA, vecB, vecC, vecD, center, angleZ, Sprite.Z_AXIS);
            }
            count = Sprite.addStaticSpriteToGeometry(geometry, vecA, vecB, vecC, vecD, texA, texB, texC, texD, count);
        }
        // Collisions
        let objCollision = new Array;
        if (this.datas.collisionKind === ObjectCollisionKind.Perfect) {
            let ws = this.datas.width();
            let hs = this.datas.height();
            let ds = this.datas.depth();
            objCollision.push({
                p: position,
                l: localPosition,
                b: [
                    centerReal.x,
                    centerReal.y,
                    centerReal.z,
                    w,
                    h,
                    d,
                    angleY,
                    angleX,
                    angleZ
                ],
                w: ws,
                h: hs,
                d: ds,
                m: Math.max(Math.max(ws, hs), ds),
                k: true
            });
        }
        return [count, objCollision];
    }
    /**
     *  Create a new geometry.
     *  @param {Position} position - The position of object 3D
     *  @return {[Core.CustomGeometry, [number, StructMapElementCollision[]]]}
    */
    createGeometry(position) {
        let geometry = new CustomGeometry();
        let collisions = this.updateGeometry(geometry, position, 0);
        geometry.updateAttributes();
        return [geometry, collisions];
    }
}
Object3DBox.VERTICES = [
    // Front
    new Vector3(0.0, 1.0, 1.0),
    new Vector3(1.0, 1.0, 1.0),
    new Vector3(1.0, 0.0, 1.0),
    new Vector3(0.0, 0.0, 1.0),
    // Back
    new Vector3(1.0, 1.0, 0.0),
    new Vector3(0.0, 1.0, 0.0),
    new Vector3(0.0, 0.0, 0.0),
    new Vector3(1.0, 0.0, 0.0),
    // Left
    new Vector3(0.0, 1.0, 0.0),
    new Vector3(0.0, 1.0, 1.0),
    new Vector3(0.0, 0.0, 1.0),
    new Vector3(0.0, 0.0, 0.0),
    // Right
    new Vector3(1.0, 1.0, 1.0),
    new Vector3(1.0, 1.0, 0.0),
    new Vector3(1.0, 0.0, 0.0),
    new Vector3(1.0, 0.0, 1.0),
    // Bottom
    new Vector3(0.0, 0.0, 1.0),
    new Vector3(1.0, 0.0, 1.0),
    new Vector3(1.0, 0.0, 0.0),
    new Vector3(0.0, 0.0, 0.0),
    // Top
    new Vector3(0.0, 1.0, 0.0),
    new Vector3(1.0, 1.0, 0.0),
    new Vector3(1.0, 1.0, 1.0),
    new Vector3(0.0, 1.0, 1.0)
];
Object3DBox.NB_VERTICES = 24;
Object3DBox.TEXTURES = [
    // Front
    [1, 5],
    [2, 5],
    [2, 6],
    [1, 6],
    // Back
    [3, 5],
    [4, 5],
    [4, 6],
    [3, 6],
    // Left
    [0, 5],
    [1, 5],
    [1, 6],
    [0, 6],
    // Right
    [2, 5],
    [3, 5],
    [3, 6],
    [2, 6],
    // Bottom
    [1, 6],
    [2, 6],
    [2, 7],
    [1, 7],
    // Top
    [1, 0],
    [2, 0],
    [2, 5],
    [1, 5]
];
Object3DBox.TEXTURES_VALUES = [
    0.0, 0.25, 0.5, 0.75, 1.0, 0.333333333333333, 0.666666666666666, 1.0
];
Object3DBox.INDEXES = [
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23
];
export { Object3DBox };
