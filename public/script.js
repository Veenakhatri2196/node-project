const socket = io();


socket.on("connect", function () {

    console.log("Socket Connected ID:", socket.id);

});



$(document).ready(function () {


    $("#userForm").submit(function (e) {


        e.preventDefault();



        let firstName = $("#firstName").val().trim();

        let lastName = $("#lastName").val().trim();

        let mobile = $("#mobile").val().trim();

        let email = $("#email").val().trim();

        let street = $("#street").val().trim();

        let city = $("#city").val().trim();

        let state = $("#state").val().trim();

        let country = $("#country").val().trim();

        let loginId = $("#loginId").val().trim();

        let password = $("#password").val();




        // Validation

        let namePattern = /^[A-Za-z\s]+$/;

        let mobilePattern = /^[0-9]{10}$/;

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;




        if (!namePattern.test(firstName)) {

            alert("First Name should contain only alphabets.");

            return;

        }



        if (!namePattern.test(lastName)) {

            alert("Last Name should contain only alphabets.");

            return;

        }



        if (!mobilePattern.test(mobile)) {

            alert("Mobile Number must contain exactly 10 digits.");

            return;

        }



        if (!emailPattern.test(email)) {

            alert("Please enter a valid Email Address.");

            return;

        }





        let user = {


            firstName: firstName,

            lastName: lastName,

            mobile: mobile,

            email: email,


            address: {

                street: street,

                city: city,

                state: state,

                country: country

            },


            loginId: loginId,

            password: password


        };





        $.ajax({


            url: "/api/users",

            type: "POST",

            contentType: "application/json",

            data: JSON.stringify(user),




            success: function (response) {



                alert(response.message);



                console.log("SAVE SUCCESS");



                let liveUser = {


                    name: user.firstName + " " + user.lastName,

                    email: user.email


                };



                console.log("Sending User Details:", liveUser);



                socket.emit("userDetails", liveUser);



                console.log("EVENT SENT");



                $("#userForm")[0].reset();



            },





            error: function (xhr) {



                console.log(xhr);



                if (xhr.responseJSON && xhr.responseJSON.errors) {



                    let errorMessage = "";



                    Object.values(xhr.responseJSON.errors)

                    .forEach(function(msg){


                        errorMessage += "• " + msg + "\n";


                    });



                    alert(errorMessage);



                }



                else if(xhr.responseJSON && xhr.responseJSON.message){



                    alert(xhr.responseJSON.message);



                }



                else {



                    alert("Unable to register user.");



                }



            }



        });



    });



});