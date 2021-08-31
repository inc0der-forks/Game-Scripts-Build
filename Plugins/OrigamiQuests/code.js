/** ============================================================================
 *
 *  code.js
 * 
 *  Build Date: 8/21/2021
 * 
 *  Made with LunaTea -- Haxe
 *
 * =============================================================================
*/
/** ============================================================================
 *
 *  code.js
 *
 *  Build Date: 8/21/2021
 *
 *  Made with LunaTea -- Haxe
 *
 * =============================================================================
 */
/** ============================================================================
 *
 *  code.js
 *
 *  Build Date: 8/20/2021
 *
 *  Made with LunaTea -- Haxe
 *
 * =============================================================================
 */
import { Game } from "../../System/Core/Game.js";
import { WindowBox } from "../../System/Core/WindowBox.js";
import { Text } from "../../System/Graphic/Text.js";
import { Plugins } from "../../System/Manager/Plugins.js";
import { Map } from "../../System/Scene/Map.js";
var $global =
  typeof window != "undefined"
    ? window
    : typeof global != "undefined"
    ? global
    : typeof self != "undefined"
    ? self
    : this;
class Quests {
  static main() {
    scenes_Map.setup();
  }
}

class scenes_Map {
  static setup() {
    let $window = new windows_Window_$Test();
    Plugins.inject(Map, "load", function () {
      $window.initialize(Game.current);
    });
    Plugins.inject(Map, "drawHUD", function () {
      $window.draw();
    });
  }
}

class windows_Window_$Test extends WindowBox {
  constructor() {
    super(0, 0, 200, 200);
  }
  initialize(game) {
    this.game = game;
    let hereos = game.teamHeroes;
    let playerName = hereos[0].name;
    this.actorText = new Text(playerName, { x: 25, y: 25 });
  }
  draw(isChoice, windowDimension, contentDimensions) {
    super.draw();
    this.actorText.draw();
  }
}

{
}
Quests.main();
