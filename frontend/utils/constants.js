let Constants = {
    PROJECT_BASE_URL: location.hostname === "localhost"
        ? "http://localhost/project/backend"
        : "https://seahorse-app-pf2x9.ondigitalocean.app",
    USER_ROLE: "user",
    ADMIN_ROLE: "admin",
    GUEST_ROLE: "guest",
    AUTH_ENDPOINTS: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        LOGOUT: "/auth/logout"
    },
    HEADERS: {
        CONTENT_TYPE: "application/json",
        AUTHORIZATION: "Authorization"
    }
}
export default Constants;