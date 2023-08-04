// const PROJECT_CONTEXT_PATH = "https://proyecto2bootcamp.besysoft.com"
const PROJECT_CONTEXT_PATH = "http://localhost:8080/api/v1"
const WS_CONTEXT_PATH = "ws://localhost:8080/api/v1"
// const WS_CONTEXT_PATH = "wss://" + location.host + "/api/v1"

// const PROJECT_CONTEXT_PATH = location.protocol + '//' + location.host.replace('4200', '8081') + '/petersen/api/v1/calificaciones/services
export const environment = {
  local: true,
  apiUrl: PROJECT_CONTEXT_PATH,
  wsUrl: WS_CONTEXT_PATH
};
