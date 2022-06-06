import * as jsEnv from 'browser-or-node'
import { action, computed, makeObservable } from 'mobx'
import locizer from 'locizer'
import { observable } from 'mobx'
import  {cookies} from '../utils/utils'

export class LocaleStore {

    languages: Array<any> = []

    public locizer = locizer.init({
        fallbackLng: process.env.LOCIZE_FALLBACK_LANGUAGE,
        referenceLng: process.env.LOCIZE_REFERENCE_LANGUAGE,
        projectId: process.env.LOCIZE_PROJECT_ID,
        apiKey: process.env.LOCIZE_API_KEY,
        loadIfTranslatedOver: 0.1, // default 1 - we only load lngs that are fully translated, lower this value to load files from languages that are just partially translated
    })

    constructor(initValues: any = {}) {

        this.loadLanguages()
        makeObservable(this, {
            languages: observable,
            loadLanguages: action.bound,
            locale: computed,
            setLocale: action.bound
        })
    }

    async loadLanguages() {

        this.locizer.getLanguages((err: any, lngs: any) => {
            for (let lng in lngs) {
                this.languages.push({
                    lng,
                    ...lngs[lng]
                })
            }
        })
    }

    get locale() {

        if (cookies.get('locale') != undefined) {
            return cookies.get('locale')
        }

        return this.locizer.detector.detect();
    }

    setLocale(locale: any) {
        cookies.set('locale', locale)
    }

}

export const localeStore = new LocaleStore(
    jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
        ? (window as any).__PRELOADED_STATE__.localeStore
        : {}
)
