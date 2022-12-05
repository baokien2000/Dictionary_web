// Enter keypress cho input username
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
// Enter keypress cho input password
$("#PassWordID").keypress(function () {
    if (event.key === "Enter") {
        event.preventDefault();
        $("#SubmitBtn").click();
    }
})

// Ẩn thông báo lỗi và thay đổi boder các inpt về ban đầu
function hideError() {
    $("#ErrorMessage").css("visibility", "hidden");
    $("input").css("border", "1px solid transparent")
}
$("input").click(function () {
    hideError()
})
// Login btn
$("#SubmitBtn").click(function () {
    let name = $("#UsernameID").val().length
    let pass = $("#PassWordID").val().length
    if (name != 0 && pass != 0) {
        LoginInfo();
    } else {
        if (name == 0) {
            $("#UsernameID").css("border", "1px solid red");
            $("#UsernameID").focus();
            $("#ErrorMessage").html("Please enter your username");
        }
        else if (pass == 0) {
            $("#PassWordID").css("border", "1px solid red")
            $("#PassWordID").focus();
            $("#ErrorMessage").html("Please enter your password");
        }
        $("#ErrorMessage").css("visibility", "visible")
    }
});

function LoginInfo() {
    let name = $("#UsernameID").val()
    let pass = $("#PassWordID").val()

    $.get("http://localhost:8080/Model/login.php", {
        name: name,
        password: pass,
    }, function (data, status) {
        if (data['data'].length == 1) {
            // đăng nhập thành công thì sẽ tạo 1 session login và chuyển trang đến main
            sessionStorage.setItem("login", "ok");
            sessionStorage.setItem("user", name);
            if (data['data'][0].role == 'admin') {
                sessionStorage.setItem("role", 'admin');
                $(location).attr('href', './admin.html')
            } else {
                sessionStorage.setItem("role", 'user');
                $(location).attr('href', './main.html')
            }
        } else {
            $("#ErrorMessage").html("Incorrect username or password")
            $("#ErrorMessage").css("visibility", "visible")
        }
    }, "json");

}