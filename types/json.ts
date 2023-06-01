export type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
export interface JsonMap { [key: string]: AnyJson; }
export type JsonArray = Array<AnyJson>;

export interface TranslationDateTime {
    month: {
        narrow: string[],
        abbreviated: string[],
        wide: string[],
    },
    monthFormatting?: {
        narrow: string[],
        abbreviated: string[],
        wide: string[],
    }
    week: {
        narrow: string[],
        short: string[],
        abbreviated: string[],
        wide: string[],
    }
}
