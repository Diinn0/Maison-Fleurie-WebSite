// https://nuxt.com/docs/api/configuration/nuxt-config
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();


export default defineNuxtConfig({
    // @ts-ignore
    runtimeConfig: {
        public: {
            siteUrl: process.env.ORIGIN,
            siteName: 'La maison fleurie',
            siteDescription: 'Elevage de maine coon dans l\'Aisne',
            language: 'fr-fr', // prefer more explicit language codes like `en-AU` over `en`
        }
    },
    extends: [
        'nuxt-seo-kit'
    ],
    // @ts-ignore
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        // '@nuxtjs/robots',
        '@nuxtjs/color-mode',
        '@sidebase/nuxt-auth'
    ],
    tailwindcss: {
        // add '~tailwind.config` alias
        exposeConfig: true
    },
    colorMode: {
        classSuffix: ""
    },
    auth: {
        // The module is enabled. Change this to disable the module
        isEnabled: true,
        // The origin is set to the development origin. Change this when deploying to production by setting `origin` in this config before build-time or by exporting `AUTH_ORIGIN` by running `export AUTH_ORIGIN=...`
        origin: process.env.API_BASE_URL,
        // Whether to periodically refresh the session. Change this to `true` for a refresh every seconds or set this to a number like `5000` for a refresh every 5000 milliseconds (aka: 5 seconds)
        enableSessionRefreshPeriodically: false,
        // Whether to refresh the session whenever a window focus event happens, i.e, when your user refocuses the window. Set this to `false` to turn this off
        enableSessionRefreshOnWindowFocus: true,
        // Whether to add a global authentication middleware that will protect all pages without exclusion
        enableGlobalAppMiddleware: false,
        // Select the default-provider to use when `signIn` is called. Setting this here will also effect the global middleware behavior: E.g., when you set it to `github` and the user is unauthorized, they will be directly forwarded to the Github OAuth page instead of seeing the app-login page
        defaultProvider: undefined,
        // Configuration of the global auth-middleware (only applies if you set `enableGlobalAppMiddleware: true` above!)
        globalMiddlewareOptions: {
            // Whether to allow access to 404 pages without authentication. Set this to `false` to force users to sign-in before seeing `404` pages. Setting this to false may lead to vue-router problems (as the target page does not exist)
            allow404WithoutAuth: true
        }
    }
})
