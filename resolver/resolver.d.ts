export interface GzComResolverOptions {
    /**
     * import style css or scss along with components
     *
     * @default true
     */
    importStyle?: boolean | "css" | "sass";
}
export declare function GzComResolver(options?: GzComResolverOptions): any;
