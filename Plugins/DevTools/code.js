/** ============================================================================
 *
 *  code.js
 * 
 *  Build Date: 8/19/2021
 * 
 *  Made with LunaTea -- Haxe
 *
 * =============================================================================
*/
import { Game } from "../../System/Core/Game.js";
import { Systems } from "../../System/Datas/Systems.js";
import { Plugins } from "../../System/Manager/Plugins.js";
import { Stack } from "../../System/Manager/Stack.js";
import { Map } from "../../System/Scene/Map.js";
var $global =
  typeof window != "undefined"
    ? window
    : typeof global != "undefined"
    ? global
    : typeof self != "undefined"
    ? self
    : this;
let params = Plugins.getParametersWithValues("DevTools");;
console.log(params);
class GameReload {
  static setup() {
    if (params.reloadShortcut != "") {
      GameReload.register();
      window.addEventListener("focus", GameReload.register);
      window.addEventListener("blur", GameReload.unregister);
      window.addEventListener("beforeunload", GameReload.unregister);
    }
  }
  static register() {
    electron_remote_GlobalShortcut.register("F5", GameReload.reload);
  }
  static unregister() {
    electron_remote_GlobalShortcut.unregister("F5");
  }
  static reload() {
    electron_renderer_Remote.getCurrentWindow().reload();
  }
}

class DevTools {
  static main() {
    if (params.quickStart) {
      Plugins.inject(
        Stack,
        "pushTitleScreen",
        function () {
          Game.current = new Game();
          Game.current.initializeDefault();
          Stack.replace(new Map(Systems.ID_MAP_START_HERO));    
          return (Stack.requestPaintHUD = true);
        },
        true
      );
    }
    if (params.showConsole) {
      electron_renderer_Remote
        .getCurrentWindow()
        .webContents.openDevTools({ mode: "detach" });
    }
    GameReload.setup();
  }
}

var electron_remote_GlobalShortcut = require("electron").remote.globalShortcut;
var electron_renderer_Remote = require("electron").remote;

{
}
DevTools.main();
