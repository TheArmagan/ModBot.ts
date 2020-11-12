import { Util } from "discord.js";
import { Utils } from "../../utils/Utils";
import { ICommandArgument } from "./ICommandArgument";

type PossibleCommandArgTypes = string | number | boolean;

export class CommandArguments {
    #arguments: Map<number, ICommandArgument> = new Map();
    #isAnyType: boolean = false;

    constructor(commandArguments: Array<ICommandArgument> = []) {
        commandArguments.forEach((cmdArg, index) => {
            this.#arguments.set(index, cmdArg);
        });
    }

    public setValue(index: number, value: any): void {
        let _arg = this.#arguments.get(index);
        if (_arg) {
            let parsed = Utils.tryToParseTypeStrict(value, [_arg.type]);
            if (parsed) {
                _arg.value = parsed;
            } else {
                throw `Can't parse value "${value}" at index ${index}`;
            }
        } else {
            throw `Command argument at index ${index} is doesn't exits.`;
        }
    }
    public getArgument(index: number) {
        let _arg = this.#arguments.get(index);
        if (_arg) {
            return _arg;
        } else {
            throw `Command argument at index ${index} is doesn't exits.`;
        }
    }
    /**
     * Shorthand for `getArgument(index).value`
     */
    public getValue(index: number): PossibleCommandArgTypes {
        return this.getArgument(index).value;
    }
    public getArguments() {
        return this.#arguments;
    }
    public getSize() {
        return this.#arguments.size;
    }
    get isAnyType() {
        return this.#isAnyType;
    }
}
