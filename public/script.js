$(document).ready(function () {

    $("#userForm").submit(function (e) {

        e.preventDefault();

        let user = {

            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            mobile: $("#mobile").val(),
            email: $("#email").val(),

            address: {

                street: $("#street").val(),
                city: $("#city").val(),
                state: $("#state").val(),
                country: $("#country").val()

            },

            loginId: $("#loginId").val(),
            password: $("#password").val()

        };

        $.ajax({

            url: "http://localhost:3000/api/users",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(user),

            success: function (response) {

                alert(response.message);

                $("#userForm")[0].reset();

            },

            error: function (err) {

                alert(err.responseJSON.message);

            }

        });

    });

});
