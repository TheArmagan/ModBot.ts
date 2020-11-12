export class Utils {
    static tryToParseType(arg: any): string | number | boolean | null | undefined {
        let _type = Utils.tryToGetType(arg);

        switch (_type) {
            case "undefined":
                return undefined;
            case "integer":
                return parseInt(arg);
            case "float":
                return parseFloat(arg);
            case "boolean":
                let _arg: string = arg.toLowerCase();
                return _arg == "true" || arg == "yes" ? true : false;
            case "string":
                return String(arg);
        }
    }

    static tryToParseTypeStrict(
        arg: any,
        strictTo: [string, ...string[]]
    ): string | number | boolean | null | undefined {
        let _type = Utils.tryToGetType(arg);

        strictTo = strictTo
            .map((i) => {
                if (i == "number") return ["integer", "float"];
                return i;
            })
            .flat(2) as [string, ...string[]];

        if (strictTo.includes("any")) {
            return arg;
        } else if (strictTo.includes(_type)) {
            return Utils.tryToParseType(arg);
        } else {
            throw `Expected possible ${strictTo.length == 1 ? "type is" : "types are"} "${strictTo.join(
                ", "
            )}" but got "${_type}"`;
        }
    }

    static tryToGetType(arg: any): string {
        if (!arg || isNaN(arg)) {
            return "undefined";
        } else if (/^[0-9]+$/.test(arg)) {
            return "integer";
        } else if (/^[0-9]+\.[0-9]+$/.test(arg)) {
            return "float";
        } else if (/^(true|false|yes|no)$/i.test(arg)) {
            return "boolean";
        } else {
            return "string";
        }
    }
}
