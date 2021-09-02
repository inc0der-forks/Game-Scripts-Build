/*
    RPG Paper Maker Copyright (C) 2017-2021 Wano

    RPG Paper Maker engine is under proprietary license.
    This source code is also copyrighted.

    Use Commercial edition for commercial use of your games.
    See RPG Paper Maker EULA here:
        http://rpg-paper-maker.com/index.php/eula.
*/
import { Datas, System } from "..";
import { Enum, Utils } from "../Common";
import { Game } from "../Core";
import { Base } from "./Base";
/** @class
 *  A skill learned by a player.
 *  @param {number} id - The ID of the skill
 */
class ShopItem extends Base {
    constructor(json) {
        super(json);
    }
    /**
     *  Read the JSON associated to the shop item.
     *  @param {Record<string, any>} json - Json object describing the shop item
     */
    read(json) {
    }
    /**
     *  Parse command with iterator.
     *  @param {any[]} command
     *  @param {StructIterator} iterator
     */
    parse(command, iterator) {
        this.selectionItem = command[iterator.i++];
        switch (this.selectionItem) {
            case Enum.ItemKind.Item:
                this.itemID = System.DynamicValue.createValueCommand(command, iterator);
                break;
            case Enum.ItemKind.Weapon:
                this.weaponID = System.DynamicValue.createValueCommand(command, iterator);
                break;
            case Enum.ItemKind.Armor:
                this.armorID = System.DynamicValue.createValueCommand(command, iterator);
                break;
        }
        this.selectionPrice = Utils.numToBool(command[iterator.i++]);
        if (this.selectionPrice) {
            this.specificPrice = [];
            let cost;
            while (command[iterator.i] != "-") {
                cost = new System.Cost();
                cost.parse(command, iterator);
                this.specificPrice.push(cost);
            }
            iterator.i++;
        }
        this.selectionStock = Utils.numToBool(command[iterator.i++]);
        if (this.selectionStock) {
            this.specificStock = System.DynamicValue.createValueCommand(command, iterator);
        }
    }
    /**
     *  Get the item system.
     *  @returns {System.CommonSkillItem}
     */
    getItem() {
        switch (this.selectionItem) {
            case Enum.ItemKind.Item:
                return Datas.Items.get(this.itemID.getValue());
            case Enum.ItemKind.Weapon:
                return Datas.Weapons.get(this.weaponID.getValue());
            case Enum.ItemKind.Armor:
                return Datas.Armors.get(this.armorID.getValue());
        }
    }
    /**
     *  Get the price.
     *  @returns {number}
     */
    getPrice() {
        return this.selectionPrice ? System.Cost.getPrice(this.specificPrice) :
            System.Cost.getPrice(this.getItem().price);
    }
    /**
     *  Get the initial stock.
     *  @returns {number}
     */
    getStock() {
        return this.selectionStock ? this.specificStock.getValue() : -1;
    }
    /**
     *  Get the initial stock.
     *  @returns {boolean}
     */
    isPossiblePrice() {
        let price = this.getPrice();
        for (let id in price) {
            if (Game.current.currencies[id] < price[id]) {
                return false;
            }
        }
        return true;
    }
    /**
     *  Get the max possible number you can buy.
     *  @param {number} initial The initial value corresponding to stock.
     *  @returns {number}
     */
    getMax(initial) {
        let price = this.getPrice();
        let max = initial;
        let p;
        for (let id in price) {
            p = price[id];
            if (p !== 0) {
                max = Math.min(max, Math.floor(Game.current.currencies[id] / p));
            }
        }
        return max;
    }
}
export { ShopItem };
