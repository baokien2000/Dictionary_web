$("input").click(function () {
    $("#ErrorMessage").css("visibility", "hidden");
    $("input").css("border", "1px solid transparent")

})
// $("a").click(function () {
//     $(location).attr('href', './login.html')
// })

$("#SubmitBtn").click(function () {
    let namebox = $("#UsernameID").val(),
        Passbox = $("#PassWordID").val(),
        RePassbox = $("#RePassWordID").val(),
        Question = $('#Security_question :selected').text(),
        Answer = $("#Security_Answer").val(),
        current_time = new Date();


    current_time = current_time.getFullYear() + "-" + current_time.getMonth() + "-" + current_time.getDate() + " " +
        current_time.getHours() + ":" + current_time.getMinutes() + ":" + current_time.getSeconds();

    register = true

    $.get("http://localhost:8080/Model/get-account.php", function (data, status) {
        data['data'].forEach(e => {
            if (e['name'] == namebox) {
                register = false
            }
        });

        if (namebox.length != 0 && Passbox.length != 0 && RePassbox.length != 0 && Answer.length != 0) {
            if (register == true) {
                if (Passbox.length < 6) {
                    $("#ErrorMessage").html("Passwords must be at least 6 characters")
                    $("#ErrorMessage").css("visibility", "visible");
                    $("#PassWordID").css("border", "1px solid red")
                    $("#PassWordID").focus();
                    // alert("Mật khẩu phải có ít nhất 6 ký tự")
                } else {
                    if (Passbox == RePassbox) {
                        $.post("http://localhost:8080/Model/add-account.php", {
                            name: namebox,
                            password: Passbox,
                            question: Question,
                            answer: Answer,
                            date: current_time,
                            role: 'user',
                        });
                        $("#ErrorMessage").css("visibility", "hidden");
                        $("input").css("border", "1px solid transparent")
                        $("#UsernameID").val('')
                        $("#PassWordID").val('')
                        $("#RePassWordID").val('')
                        alert("Register Success")
                        $(location).attr('href', './login.html')
                    } else {
                        $("#ErrorMessage").html("Password does not match")
                        $("#ErrorMessage").css("visibility", "visible");
                        $("#PassWordID").css("border", "1px solid red")
                        $("#RePassWordID").css("border", "1px solid red")
                        $("#PassWordID").focus();
                        // alert("Mật khẩu không trùng khớp")
                    }
                }
            } else {
                $("#ErrorMessage").html("Account already exists")
                $("#ErrorMessage").css("visibility", "visible");
                $("#UsernameID").css("border", "1px solid red")
                $("#UsernameID").focus();
                // alert("Tài khoàn đã tốn tại")
            }
        } else {
            if (Answer.length == 0) {
                $("#Security_Answer").css("border", "1px solid red")
                $("#Security_Answer").focus();
            }
            if (RePassbox.length == 0) {
                $("#RePassWordID").css("border", "1px solid red")
                $("#RePassWordID").focus();
            }

            if (Passbox.length == 0) {
                $("#PassWordID").css("border", "1px solid red")
                $("#PassWordID").focus();
            }
            if (namebox.length == 0) {
                $("#UsernameID").css("border", "1px solid red")
                $("#UsernameID").focus();
            }
            $("#ErrorMessage").html("Please enter full information")
            $("#ErrorMessage").css("visibility", "visible");
        }

    }, "json");
})
$("#UsernameID").keypress(function () {
    if (event.key === "Enter") {
        event.preventDefault();
        if ($("#PassWordID").val() == "") {
            $("#PassWordID").focus();
        } else {
            $("#SubmitBtn").click();
        }
    }
})
$("#PassWordID").keypress(function () {
    if (event.key === "Enter") {
        event.preventDefault();
        if ($("#RePassWordID").val() == "") {
            $("#RePassWordID").focus();
        } else {
            $("#SubmitBtn").click();
        }
    }
})
$("#RePassWordID").keypress(function () {
    if (event.key === "Enter") {
        event.preventDefault();
        if ($("#Security_Answer").val() == "") {
            $("#Security_Answer").focus();
        } else {
            $("#SubmitBtn").click();
        }
    }
})
$("#Security_Answer").keypress(function () {
    if (event.key === "Enter") {
        $("#SubmitBtn").click();
    }
})

function hideError() {
    $("#ErrorMessage").css("visibility", "hidden");
    $("input").css("border", "1px solid transparent")
}