type Unpack<T> = T extends (infer U)[] ? U : T;

export type Paths<T> = T extends object ? {
    [K in keyof T]-?: K extends string | number
        ? `${K}` | (Paths<Unpack<T[K]>> extends infer P ? (P extends string ? `${K}.${P}` : never) : never)
        : never;
}[keyof T] : never;