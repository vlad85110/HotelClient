export class Routing {
    static chooseRoute(state, map) {

        for (let [route, value] of Object.entries(map)) {
            if (route === state) {
                return value
            }
        }

        return null
    }
}