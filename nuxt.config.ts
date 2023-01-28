// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {

        }
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        // '@nuxtjs/robots',
        '@nuxtjs/color-mode'
    ],
    tailwindcss: {
        // add '~tailwind.config` alias
        exposeConfig: true
    },
    colorMode: {
        classSuffix: ""
    }
})
