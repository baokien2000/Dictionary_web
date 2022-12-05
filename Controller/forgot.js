$("input").click(function () {

    $("#ErrorMessage").css("visibility", "hidden");
    $("input").css("border", "1px solid transparent")
})

$("#SubmitBtn").click(function () {
    let namebox = $("#UsernameID").val(),
        Passbox = $("#PassWordID").val(),
        RePassbox = $("#RePassWordID").val(),
        Question = $('#Security_question :selected').text(),
        Answer = $("#Security_Answer").val();

    $.get("http://localhost:8080/Model/forgot.php", {
        name: namebox,
        question: Question,
        answer: Answer
    }, function (data, status) {
        if (namebox.length != 0 && Passbox.length != 0 && RePassbox.length != 0 && Answer.length != 0) {
            if (data['data'].length == 1) {
                if (Passbox.length < 6) {
                    $("#ErrorMessage").html("Passwords must be at least 6 characters")
                    $("#ErrorMessage").css("visibility", "visible");
                    $("#PassWordID").css("border", "1px solid red")
                    $("#PassWordID").focus();
                } else {
                    if (Passbox == RePassbox) {
                        $.post("http://localhost:8080/Model/update-password.php", {
                            id: data['data'][0].id,
                            password: RePassbox,
                        });
                        $("#ErrorMessage").css("visibility", "hidde");
                        $("input").css("border", "1px solid transparent")
                        $("#UsernameID").val('')
                        $("#PassWordID").val('')
                        $("#RePassWordID").val('')
                        alert("Reset password Success")
                        $(location).attr('href', './login.html')
                    } else {
                        $("#ErrorMessage").html("Password does not match")
                        $("#ErrorMessage").css("visibility", "visible");
                        $("#PassWordID").css("border", "1px solid red")
                        $("#RePassWordID").css("border", "1px solid red")
                        $("#PassWordID").focus();
                    }
                }
            } else {
                $("#ErrorMessage").html("username or question security is not correct")
                $("#ErrorMessage").css("visibility", "visible");
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
        if ($("#Security_Answer").val() == "") {
            $("#Security_Answer").focus();
        } else {
            $("#SubmitBtn").click();
        }
    }
})
$("#Security_Answer").keypress(function () {
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
        $("#SubmitBtn").click();
    }
})

function hideError() {
    $("#ErrorMessage").css("visibility", "hidde");
    $("input").css("border", "1px solid transparent")
}