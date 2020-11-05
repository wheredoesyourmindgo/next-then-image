declare const getLqip: (url: string) => Promise<string>;
declare const getLqips: (urls: Array<string>) => Promise<(string | null)[]>;
export { getLqip, getLqips };
