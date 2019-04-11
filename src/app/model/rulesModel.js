import {EventEmitterMixin} from "../event_emitter";
import Model from "./model";

export default class RulesModel extends EventEmitterMixin(Model){
    constructor() {
        super();
    }

}