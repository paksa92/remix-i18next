import type { InitOptions, i18n, Module, NewableModule } from "i18next";
import type { MiddlewareFunction, RouterContextProvider } from "react-router";
import type { LanguageDetectorOption } from "./lib/language-detector.js";
export declare function createI18nextMiddleware({ detection, i18next, plugins, }: createI18nextMiddleware.Options): createI18nextMiddleware.ReturnType;
export declare namespace createI18nextMiddleware {
    interface Options {
        /**
         * The i18next options used to initialize the internal i18next instance.
         */
        i18next?: Omit<InitOptions, "detection">;
        /**
         * The i18next plugins used to extend the internal i18next instance
         * when creating a new TFunction.
         */
        plugins?: NewableModule<Module>[] | Module[];
        detection: LanguageDetectorOption;
    }
    type ReturnType = [
        MiddlewareFunction<Response>,
        (context: Readonly<RouterContextProvider>) => string,
        (context: Readonly<RouterContextProvider>) => i18n
    ];
}
