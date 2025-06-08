import Constants from '../../utils/constants.js';
import UserService from '../../services/user-service.js';

$(document).ready(function() {
    // Initialize form validation
    $("#login-form").validate({
        rules: {
            loginInput: {
                required: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            loginInput: {
                required: "Please enter your username or email"
            },
            password: {
                required: "Please enter your password",
                minlength: "Password must be at least 6 characters long"
            }
        },
        submitHandler: function(form) {
            console.log("submitHandler reached"); // za debbug 
            // Create the entity object with keys expected by the backend
            var entity = {
                email: $("#loginInput").val().trim(), // Use the value from loginInput for the 'email' key
                password: $("#loginPassword").val().trim()
            };

            UserService.login(entity);
            return false; // Prevent form from submitting normally
        }
    });

    if (window.location.hash === "#cars") {
        initCars();
    }
});

window.addEventListener('hashchange', function() {
    if (window.location.hash === "#cars") {
        initCars();
    }
});

