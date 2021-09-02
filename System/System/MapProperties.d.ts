import { Base } from "./Base";
import { System } from "../index";
import { PlaySong } from "./PlaySong";
import { DynamicValue } from "./DynamicValue";
import { MapObject } from "../Core/MapObject";
import { CameraProperties } from "./CameraProperties";
import { Color } from "./Color";
/** @class
 *  The properties of a map.
 *  @extends System.Base
 */
declare class MapProperties extends Base {
    id: number;
    name: string;
    length: number;
    width: number;
    height: number;
    depth: number;
    tileset: System.Tileset;
    music: PlaySong;
    backgroundSound: PlaySong;
    cameraProperties: CameraProperties;
    isBackgroundColor: boolean;
    isBackgroundImage: boolean;
    backgroundColorID: DynamicValue;
    backgroundColor: Color;
    backgroundImageID: number;
    backgroundSkyboxID: DynamicValue;
    startupObject: MapObject;
    randomBattleMapID: System.DynamicValue;
    randomBattles: System.RandomBattle[];
    randomBattleNumberStep: System.DynamicValue;
    randomBattleVariance: System.DynamicValue;
    cameraBackground: THREE.Camera;
    sceneBackground: THREE.Scene;
    skyboxGeometry: THREE.BoxGeometry;
    currentNumberSteps: number;
    maxNumberSteps: number;
    constructor();
    /**
     *  Read the JSON associated to the map properties.
     *  @param {Record<string, any>} - json Json object describing the map
     *  properties
     */
    read(json: Record<string, any>): void;
    /**
     *  Update the background.
     */
    updateBackground(): void;
    /**
     *  Update the background color.
     */
    updateBackgroundColor(): void;
    /**
     *  Update the background image.
     */
    updateBackgroundImage(): void;
    /**
     *  Update the background skybox.
     */
    updateBackgroundSkybox(): void;
    /**
     *  Update the max steps numbers for starting a random battle.
     */
    updateMaxNumberSteps(): void;
    /**
     *  Check if a random battle can be started.
     */
    checkRandomBattle(): void;
}
export { MapProperties };
