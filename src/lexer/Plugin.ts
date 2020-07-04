import { Grammar } from "./Grammar";

export interface Plugin {
    id: string,
    grammars: Grammar
}