import { createInstance } from "i18next";
import { createContext } from "react-router";
import { LanguageDetector } from "./lib/language-detector.js";
export function createI18nextMiddleware({ detection, i18next = {}, plugins = [], }) {
    let localeContext = createContext();
    let i18nextContext = createContext();
    let languageDetector = new LanguageDetector(detection);
    return [
        async function i18nextMiddleware({ request, context }, next) {
            let lng = await languageDetector.detect(request);
            context.set(localeContext, lng);
            let instance = createInstance(i18next);
            for (const plugin of plugins ?? [])
                instance.use(plugin);
            await instance.init({ lng });
            context.set(i18nextContext, instance);
            return await next();
        },
        (context) => context.get(localeContext),
        (context) => context.get(i18nextContext),
    ];
}
//# sourceMappingURL=middleware.js.map