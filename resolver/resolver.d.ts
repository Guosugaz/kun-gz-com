declare module "resolver" {
    export interface GzComResolverOptions {
        /**
         * import style css or scss along with components
         *
         * @default true
         */
        importStyle?: boolean | "css" | "sass";
    }
    export function GzComResolver(options?: GzComResolverOptions): any;
}
