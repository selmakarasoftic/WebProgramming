$(document).ready(function () {
    // Initialize SPApp once
    const app = $.spapp({
        templateDir: "./pages/",
        defaultView: "home",
        pageNotFound: "404"
    });

    // Home Route
    app.route({
        view: "home",
        load: "home.html",
        onReady: function () {
            if (typeof initHome === "function") initHome();
        }
    });

    // Cars Route
    app.route({
        view: "cars",
        load: "cars.html",
        onReady: function () {
            if (typeof initCars === "function") initCars();
        }
    });

    // Reviews Route
    app.route({
        view: "reviews",
        load: "reviews.html",
        onReady: function () {
            if (typeof initReviews === "function") initReviews();
        }
    });

    // Meetups Route
    app.route({
        view: "meetups",
        load: "meetups.html",
        onReady: function () {
            if (typeof initMeetups === "function") initMeetups();
        }
    });

    // Profile Route
    app.route({
        view: "profile",
        load: "profile.html",
        onReady: function () {
            if (typeof initProfile === "function") initProfile();
        }
    });
    app.route({
        view: "admin",
        load: "pages/admin.html",
        onReady: function () {
            initAdminPage();
        }
    });
    

    // Run the SPA only once
    app.run();
});
