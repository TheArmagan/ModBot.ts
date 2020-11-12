export interface ICommandArgument {
    type: "string" | "number" | "boolean" | "any";
    required?: boolean;
    look?: string;
    value: string | number | boolean;
}
