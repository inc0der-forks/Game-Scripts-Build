/** ============================================================================
 *
 *  OrigamiHUD
 * 
 *  Build Date: 8/26/2021
 * 
 *  Made with PaperTea -- Haxe
 *
 * =============================================================================
*/
/** ============================================================================
 *
 *  OrigamiHUD
 *
 *  Build Date: 8/25/2021
 *
 *  Made with PaperTea -- Haxe
 *
 * =============================================================================
 */
import { Platform } from "../../System/Common/Platform.js";
import { ScreenResolution } from "../../System/Common/ScreenResolution.js";
import { Bitmap } from "../../System/Core/Bitmap.js";
import { Game } from "../../System/Core/Game.js";
import { WindowBox } from "../../System/Core/WindowBox.js";
import { Base } from "../../System/Graphic/Base.js";
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

class Reflect {
  static getProperty(o, field) {
    let tmp;
    if (o == null) {
      return null;
    } else {
      let tmp1;
      if (o.__properties__) {
        tmp = o.__properties__["get_" + field];
        tmp1 = tmp;
      } else {
        tmp1 = false;
      }
      if (tmp1) {
        return o[tmp]();
      } else {
        return o[field];
      }
    }
  }
}

class graphics_Gauge extends Bitmap {
  constructor(
    value,
    max,
    text,
    strokeWidth,
    strokeColor,
    backColor,
    color,
    fontSize
  ) {
    super();
    this.value = value;
    this.text = text;
    this.max = graphics_Gauge.defaultValue(max, value);
    this.color = graphics_Gauge.defaultValue(color, "#f75456");
    this.strokeWidth = graphics_Gauge.defaultValue(strokeWidth, 1);
    this.strokeColor = graphics_Gauge.defaultValue(strokeColor, "#1c2226");
    this.color = graphics_Gauge.defaultValue(color, "#f75456");
    this.backColor = graphics_Gauge.defaultValue(backColor, "#010411");
    this.fontSize = graphics_Gauge.defaultValue(fontSize, 16);
    this.rate = value / max;
    if (this.text != null) {
      this.nameText = new Text(text, {
        fontSize: this.fontSize,
        align: "left",
        verticalAlign: 2,
      });
    }
    this.valuesText = new Text("" + value + " / " + max, {
      fontSize: this.fontSize,
      align: "right",
      verticalAlign: 2,
    });
  }
  updateValue(value, max, forceMaxUpdate) {
    if (forceMaxUpdate == null) {
      forceMaxUpdate = false;
    }
    if (this.value != value || this.max != max) {
      if (this.value >= this.max || forceMaxUpdate) {
        this.max = max;
      }
      this.value = value;
      this.valuesText.setText("" + this.value + " / " + this.max);
      this.rate = this.value / this.max;
    }
  }
  draw(x, y, w, h) {
    let x2 = ScreenResolution.getScreenX(x);
    let y2 = ScreenResolution.getScreenY(y);
    let w2 = ScreenResolution.getScreenX(w);
    let h2 = ScreenResolution.getScreenY(h);
    Platform.ctx.save();
    Platform.ctx.beginPath();
    Platform.ctx.fillStyle = this.backColor;
    Platform.ctx.fillRect(x2, y2, w2, h2);
    Platform.ctx.fillStyle = this.color;
    Platform.ctx.fillRect(x2, y2, w2 * this.rate, h2);
    Platform.ctx.lineWidth = this.strokeWidth;
    Platform.ctx.strokeStyle = this.strokeColor;
    Platform.ctx.strokeRect(x2, y2, w2, h2);
    Platform.ctx.restore();
    if (this.nameText != null) {
      this.nameText.draw(x, y, w, h);
    }
    if (this.valuesText != null) {
      this.valuesText.draw(x, y, w, h);
    }
  }
  static defaultValue(value, defaultValue) {
    if (value == null) {
      return defaultValue;
    } else {
      return value;
    }
  }
}

class graphics_HudContents extends Base {
  constructor() {
    super();
    this.hpGaugeOptions = Plugins.getParameter("OrigamiHUD", "HP Gauge");
    this.expGaugeOptions = Plugins.getParameter("OrigamiHUD", "Exp Gauge");
    console.log("src/graphics/HudContents.hx:31:", this.hpGaugeOptions);
    this.leader = Game.current.teamHeroes[0];
    this.actorNameText = new Text(this.leader.name, { fontSize: 20 });
    this.actorLevelText = new Text("Level " + this.leader.getCurrentLevel(), {
      fontSize: 20,
      align: "right",
    });

    this.healthGauge = new graphics_Gauge(
      this.getActorStatValue(this.leader, this.hpGaugeOptions.stat),
      this.getActorStatValue(this.leader, this.hpGaugeOptions.stat, true),
      this.hpGaugeOptions.stat.name(),
      null,
      null,
      null,
      "#f75456",
      null
    );

    this.expGauge = new graphics_Gauge(
      this.getActorStatValue(this.leader, this.expGaugeOptions.stat),
      this.getActorStatValue(this.leader, this.expGaugeOptions.stat, true),
      this.expGaugeOptions.stat.name(),
      null,
      null,
      null,
      "#1262b7",
      null
    );
  }
  getActorStatValue(actor, stat, isMax) {
    if (isMax == null) {
      isMax = false;
    }
    if (isMax) {
      return Reflect.getProperty(actor, stat.getMaxAbbreviation());
    }
    return Reflect.getProperty(actor, stat.abbreviation);
  }
  update() {
    let hp = this.getActorStatValue(this.leader, this.hpGaugeOptions.stat);
    let mhp = this.getActorStatValue(
      this.leader,
      this.hpGaugeOptions.stat,
      true
    );

    let exp = this.getActorStatValue(this.leader, this.expGaugeOptions.stat);
    let maxExp = this.getActorStatValue(
      this.leader,
      this.expGaugeOptions.stat,
      true
    );

    this.healthGauge.updateValue(hp, mhp, true);
    this.expGauge.updateValue(exp, maxExp);
  }
  draw(x, y, w, h, positionResize) {
    this.actorNameText.draw(x, y);
    this.actorLevelText.draw(x, y, w);
    this.healthGauge.draw(x, y + 20, w, 20);
    this.expGauge.draw(x, y + 45, w, 15);
  }
}

class scenes_Map {
  static createHudWindow() {
    let width = 200;
    let height = 100;
    scenes_Map.contents = new graphics_HudContents();
    scenes_Map.window = new WindowBox(5, 5, width, height, {
      content: scenes_Map.contents,
      padding: WindowBox.MEDIUM_PADDING_BOX,
    });
  }
  static setup() {
    Plugins.inject(Map, "load", function (self) {
      scenes_Map.createHudWindow();
    });
    Plugins.inject(Map, "update", function (self) {
      scenes_Map.window.update();
    });
    Plugins.inject(Map, "drawHUD", function () {
      scenes_Map.window.draw();
    });
  }
}

{
}
graphics_Gauge.__meta__ = { fields: { value: { required: null } } };
Quests.main();
