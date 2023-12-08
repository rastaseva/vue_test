import {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
} from "vuetify/labs/VDataTable";

import {ru} from  'vuetify/lib/locale'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'


export default createVuetify({
    icons: {
        defaultSet: 'mdi',
    },
    theme: {
        options: {
            customProperties: true,
        },
        defaultTheme: 'main',
        themes: {
            main: {
                dark: false,
                colors: {
                    primary: '#2c3a52',
                    attention: '#d44b38',
                    secondary: '#424242',
                    accent: '#82B1FF',
                    error: '#FF5252',
                    info: '#115bdc',
                    success: '#4CAF50',
                    warning: '#F06292',
                }
            },
        },
    },
    locale: {
        locale: 'ru',
        fallback: 'ru',
        messages: { ru },
    },
    components: {
        ...components,
        VDataTable,
        VDataTableServer,
        VDataTableVirtual,
    },
    directives,
});
