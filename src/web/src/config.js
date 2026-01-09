
export const applicationName =
    process.env.VUE_APP_APPLICATION_NAME || "Template App";
export const applicationIcon =
    process.env.VUE_APP_APPLICATION_ICON || "mdi-cash-register";
export const hasSidebar =
    process.env.VUE_APP_HAS_SIDEBAR === "false" ? false : true;
export const hasSidebarClosable =
    process.env.VUE_APP_HAS_SIDEBAR_CLOSABLE === "true" ? true : false;

export const sections = [
    {
        name: "Dashboard",
        url: "/",
        icon: "mdi-view-dashboard"
    },
    {
        name: "Basic Form",
        url: "/form",
        icon: "mdi-book-open-variant"
    },
    {
        name: "Data grid",
        url: "/grid",
        icon: "mdi-table-large"
    }
];
export const environment = process.env.NODE_ENV;
export const apiBaseUrl =
    process.env.VUE_APP_API_BASE_URL ||
    (process.env.NODE_ENV == "production" ? "" : "http://localhost:3000");
