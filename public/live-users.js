const socket = io();


socket.on("liveUsers", function(data){


    // Update live count

    document.getElementById("liveCount").innerText = data.count;



    // User list

    let userList = document.getElementById("userList");


    userList.innerHTML = "";



    data.users.forEach(function(user){



        let li = document.createElement("li");


        li.className = "list-group-item";



        li.innerHTML = `

            <strong>🟢 ${user.name}</strong>

            <br>

            📧 ${user.email}

        `;



        userList.appendChild(li);



    });



});