let target_id,
    target_name,
    current_tablePage,
    AccountData,
    SearchTable;

//login check
if (sessionStorage.getItem("login") == null || sessionStorage.getItem("login") == "") {
    $(location).attr("href", "../View/login.html");
}
if (sessionStorage.getItem("role") != "admin") {
    $(location).attr("href", "../View/main.html");
}
$(".container").css("display", "block");


// main.js
$("#userBar p").html(sessionStorage.getItem("user"))

$("html").click(function (e) {
    if (e.target.id != "userBar") {
        $("#userBar").css("display", "none")
    }
    if (e.target.id == "userIcon") {
        $("#userBar").css("display", "block")
    }
    if (e.target.id != "searchBtn" &&
        e.target.id != "searchIcon") {
        $(".SuggestionsDiv").css("visibility", "hidden");
    }
});

$("#LogoutBtn").click(function () {
    $("#myModal").css("display", "flex");
})
$("#ForgotBtn").click(function () {
    $("#myEditModal").css("display", "flex");
})

$("#btn-changePass").click(function () {
    let name = $("#userBar p").html(),
        OldPass = $("#PassWordID").val(),
        NewPass = $("#NewPassWordID").val(),
        ReNewPass = $("#ReNewPassWordID").val();

    $.get("http://localhost:8080/Model/login.php", {
        name: name,
        password: OldPass,
    }, function (data, status) {
        if (OldPass.length != 0 && NewPass.length != 0 && ReNewPass.length != 0) {
            if (data['data'].length == 1) {
                if (NewPass.length < 6) {
                    $(".ErrorMessage").html("Passwords must be at least 6 characters");
                    $(".ErrorMessage").css("visibility", "visible");
                    $("#NewPassWordID").css("border", "1px solid red");
                    $("#NewPassWordID").focus();
                } else {
                    if (NewPass == ReNewPass) {
                        if (NewPass != OldPass) {
                            $.post("http://localhost:8080/Model/update-password.php", {
                                id: data['data'][0].id,
                                password: NewPass,
                            });
                            $(".ErrorMessage").css("visibility", "hidden");
                            $(".modal input").css("border", "1px solid transparent");
                            $("#PassWordID").val('');
                            $("#NewPassWordID").val('');
                            $("#ReNewPassWordID").val('');
                            alert("Change password successfully");
                            $("#myEditModal").css("display", "none");
                        } else {
                            $(".ErrorMessage").html("The new password cannot be the same as the current password.");
                            $(".ErrorMessage").css("visibility", "visible");
                            $("#NewPassWordID").css("border", "1px solid red");
                            $("#NewPassWordID").focus();
                        }

                    } else {
                        $(".ErrorMessage").html("New Password does not match");
                        $(".ErrorMessage").css("visibility", "visible");
                        $("#NewPassWordID").css("border", "1px solid red");
                        $("#ReNewPassWordID").css("border", "1px solid red");
                        $("#NewPassWordID").focus();
                    }
                }
            } else {
                $(".ErrorMessage").html("Old password is not correct");
                $(".ErrorMessage").css("visibility", "visible");
                $("#PassWordID").css("border", "1px solid red");
                $("#PassWordID").focus();
            }
        } else {
            if (ReNewPass.length == 0) {
                $("#ReNewPassWordID").css("border", "1px solid red");
                $("#ReNewPassWordID").focus();
            }

            if (NewPass.length == 0) {
                $("#NewPassWordID").css("border", "1px solid red");
                $("#NewPassWordID").focus();
            }
            if (OldPass.length == 0) {
                $("#PassWordID").css("border", "1px solid red");
                $("#PassWordID").focus();
            }
            $(".ErrorMessage").html("Please enter full information");
            $(".ErrorMessage").css("visibility", "visible");
        }
    }, "json");

})
$("#PassWordID").keypress(function () {
    if (event.key === "Enter") {
        event.preventDefault();
        if ($("#NewPassWordID").val() == "") {
            $("#NewPassWordID").focus();
        } else {
            $("#btn-changePass").click();
        }
    }
})
$("#NewPassWordID").keypress(function () {
    if (event.key === "Enter") {
        event.preventDefault();
        if ($("#ReNewPassWordID").val() == "") {
            $("#ReNewPassWordID").focus();
        } else {
            $("#btn-changePass").click();
        }
    }
})
$("#ReNewPassWordID").keypress(function () {
    if (event.key === "Enter") {
        $("#btn-changePass").click();
    }
})

$(".btn-close").click(function () {
    $(".modal").css("display", "none");
    $(".ErrorMessage").css("visibility", "hidden");
    $(".modal input").css("border", "1px solid transparent");
    $(".modal input").val('');
})
$(".XIcon").click(function () {
    $(".modal").css("display", "none");
    $(".ErrorMessage").css("visibility", "hidden");
    $(".modal input").css("border", "1px solid transparent");
    $(".modal input").val('');
})

$(".modal input").click(function () {
    $(".ErrorMessage").css("visibility", "hidden");
    $(".modal input").css("border", "1px solid transparent");
})
function hideError() {
    $(".ErrorMessage").css("visibility", "hidden");
    $(".modal input").css("border", "1px solid transparent");
}



$("#btn-logOut").click(function () {
    sessionStorage.setItem("login", "");
    sessionStorage.setItem("user", "");
    $(location).attr('href', '../View/login.html');
})



//admin
$(document).ready(function () {
    current_tablePage = 1;
    getData();
})
function getData() {

    let Suggestions = "";

    $.get("http://localhost:8080/Model/get-account.php", function (data, status) {
        AccountData = [];
        data['data'].forEach(e => {
            Suggestions += e["name"] + ",";
            AccountData.push(`
            <tr>
                <th style="width:7%" scope="row">` + e['id'] + `</th>
                <td >` + e['name'] + `</td>
                <td style="width:25%">` + e['date'] + `</td>
                <td style="width:15%">` + e['role'] + `</td>
                <td style="width:25%">
                    <a href="#" onclick="EditAccount('` + e['id'] + `','` + e['name'] + `','` + e['role'] + `')">Edit</a>
                    <a href="#" onclick="RemoveAccount('` + e['id'] + `','` + e['name'] + `')">Delete</a>
                </td>
            </tr>`);
        });

        // current_tablePage * '6' với '6' là số dòng của mỗi trang table
        let endNum = current_tablePage * 6, // vị trí cuối của TablePagination
            beginNum = endNum - 6, // vị trí đầu của TablePagination
            tableDisplay = "", // data các dòng hiện ra trên table
            Table_NumHtml = "",// code Html của table Pagination
            active;
        pageAmount = Math.ceil(data["data"].length / 6)
        current_tablePage = parseInt(current_tablePage)

        let isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1,
            First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst,
            tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1,
            Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;


        Table_NumHtml +=
            '<li class="pagination-item" onclick="FirstPagination_click($(this),`Main`)">' +
            '<a class="">First</a></li>';
        for (let j = First; j <= Last; j++) {
            active = j == current_tablePage ? "pagination-item-active" : "";
            Table_NumHtml +=
                '<li class="pagination-item" onclick="Pagination_click($(this),`Main`)">' +
                '<a class="pagination-link ' + active + '">' + j + "</a></li>";
        }
        Table_NumHtml +=
            '<li class="pagination-item" onclick="LastPagination_click($(this),`Main`)">' +
            '<a class="">Last</a></li>';


        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += AccountData[i];
        }
        $("#Search_value").html(Suggestions);
        $("#Table_pagination").html(Table_NumHtml);
        $("#adminTable").html(tableDisplay);
    }, "json");
}

function EditAccount(id, name, role) {
    target_name = name;
    target_id = id;
    value = role == 'admin' ? "1" : "2"
    $("#SelectRole").val(value).change();
    $("#UsernameID").val(name)
    $("#myUpdateAccountModal").css("display", "flex")

}

function RemoveAccount(id, name) {
    $("#myDeleteAccountModal p b").html(name)
    target_id = id;
    $("#myDeleteAccountModal").css("display", "flex")
}
$("#btn-Delelte").click(function () {
    if ($("#adminTable tr").length == 1) {
        current_tablePage -= 1;
    }
    $.post("http://localhost:8080/Model/delete-account.php", {
        id: target_id,
    });
    alert("Delete Success")
    $("#myDeleteAccountModal").css("display", "none")
    setTimeout(getData(), 20);
})

$("#btn-updateAccount").click(function () {
    if ($("#UsernameID").val() != '') {
        if ($("#UsernameID").val() == target_name) {
            $.post("http://localhost:8080/Model/update-account.php", {
                id: target_id,
                name: $("#UsernameID").val(),
                role: $("#SelectRole option:selected").text(),
            });
            alert("Update Success")
            $("#myUpdateAccountModal").css("display", "none")
            setTimeout(getData(), 20);
        } else {
            $.get("http://localhost:8080/Model/get-account.php", function (data, status) {
                let existAccount = false;
                data['data'].forEach(e => {
                    if ($("#UsernameID").val() == e['name']) {
                        existAccount = true;
                    }
                });
                if (existAccount == false) {
                    $.post("http://localhost:8080/Model/update-account.php", {
                        id: target_id,
                        name: $("#UsernameID").val(),
                        role: $("#SelectRole option:selected").text(),
                    });
                    alert("Update Success")
                    $("#myUpdateAccountModal").css("display", "none")
                    setTimeout(getData(), 20);
                } else {
                    $("#UsernameID").css("border", "1px solid red")
                    $("#UsernameID").focus();
                    $(".ErrorMessage").html("Account already exists")
                    $(".ErrorMessage").css("visibility", "visible");
                }
                // $("#adminTable").html(AccountData);
            }, "json");
        }
    } else {
        $("#UsernameID").css("border", "1px solid red")
        $("#UsernameID").focus();
        $(".ErrorMessage").html("Please enter full information")
        $(".ErrorMessage").css("visibility", "visible");
    }
})


// Table pagination event

// sự kiện table pagination click 
function Pagination_click(e, table) {
    current_tablePage = $(e).text();
    let endNum = current_tablePage * 6,
        beginNum = endNum - 6,
        tableDisplay = "",
        isFirst, First, tablePageDisplay, Last;
    if (table == "Main") {
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += AccountData[i];
        }
        pageAmount = Math.ceil(AccountData.length / 6)
    } else {
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
        pageAmount = Math.ceil(SearchTable.length / 6)
    }
    current_tablePage = parseInt(current_tablePage)

    switch (pageAmount) {
        case 1:
            First = 1
            Last = 1
            break;
        case 2:
            First = 1
            Last = 2
            break;
        default:
            isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
            First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
            tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
            Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;
    }


    let Table_NumHtml = "",
        active;

    Table_NumHtml +=
        '<li class="pagination-item" onclick="FirstPagination_click($(this),`' + table + '`)">' +
        '<a class="">First</a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "pagination-item-active" : "";
        Table_NumHtml +=
            '<li class="pagination-item" onclick="Pagination_click($(this),`' + table + '`)">' +
            '<a class="pagination-link ' + active + '">' + j + "</a></li>";
    }
    Table_NumHtml +=
        '<li class="pagination-item" onclick="LastPagination_click($(this),`' + table + '`)">' +
        '<a class="">Last</a></li>';

    $("#Table_pagination").html(Table_NumHtml);
    $("#adminTable").html(tableDisplay);
}

function FirstPagination_click(e, table) {
    let tableDisplay = "",
        First = 1,
        Last,
        Table_NumHtml = "",
        active,
        pageAmount;

    current_tablePage = 1
    if (table == "Main") {
        pageAmount = Math.ceil(AccountData.length / 6);
        for (let i = 0; i < 6; i++) {
            tableDisplay += AccountData[i];
        }
    } else {
        pageAmount = Math.ceil(SearchTable.length / 6);
        for (let i = 0; i < 6; i++) {
            tableDisplay += SearchTable[i];
        }
    }
    Last = pageAmount < 3 ? pageAmount : 3;

    Table_NumHtml +=
        '<li class="pagination-item" onclick="FirstPagination_click($(this),`' + table + '`)">' +
        '<a class="">First</a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "pagination-item-active" : "";
        Table_NumHtml +=
            '<li class="pagination-item" onclick="Pagination_click($(this),`' + table + '`)">' +
            '<a class="pagination-link ' + active + '">' + j + "</a></li>";
    }
    Table_NumHtml +=
        '<li class="pagination-item" onclick="LastPagination_click($(this),`' + table + '`)">' +
        '<a class="">Last</a></li>';

    $("#Table_pagination").html(Table_NumHtml);
    $("#adminTable").html(tableDisplay);
}

function LastPagination_click(e, table) {

    let endNum,
        beginNum,
        tableDisplay = "", First, Last;

    if (table == "Main") {
        current_tablePage = Math.ceil(AccountData.length / 6);
        endNum = current_tablePage * 6;
        beginNum = endNum - 6;
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += AccountData[i];
        }
    } else {
        current_tablePage = Math.ceil(SearchTable.length / 6);
        endNum = current_tablePage * 6;
        beginNum = endNum - 6;
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
    }
    current_tablePage = parseInt(current_tablePage)


    First = current_tablePage < 3 ? 1 : current_tablePage - 2
    Last = current_tablePage;

    let Table_NumHtml = "",
        active;

    Table_NumHtml +=
        '<li class="pagination-item" onclick="FirstPagination_click($(this),`' + table + '`)">' +
        '<a class="">First</a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "pagination-item-active" : "";
        Table_NumHtml +=
            '<li class="pagination-item" onclick="Pagination_click($(this),`' + table + '`)">' +
            '<a class="pagination-link ' + active + '">' + j + "</a></li>";
    }
    Table_NumHtml +=
        '<li class="pagination-item" onclick="LastPagination_click($(this),`' + table + '`)">' +
        '<a class="">Last</a></li>';

    $("#Table_pagination").html(Table_NumHtml);
    $("#adminTable").html(tableDisplay);
}

// Search event

// sự kiện onchange search input
$("#searchBtn").on("input", function (e) {
    setTimeout(function () {
        let rowSuggestions = $("#searchBtnautocomplete-list>div").length;
        // console.log(rowSuggestions)myInputautocomplete-list
        if ($("#searchBtn").val() != "" && rowSuggestions != 0) {
            $(".SuggestionsDiv").css("visibility", "visible");
        } else {
            $(".SuggestionsDiv").css("visibility", "hidden");
        }
    }, 20);
});


//search input click
$("#searchBtn").click(function () {
    Suggestions = $("#Search_value").html().split(",");
    Suggestions.pop();
    autocomplete(document.getElementById("searchBtn"), Suggestions);
});

// nút search icon click
$(".form-control-feedback").click(function () {
    $(".NullValue").css("display", "none")
    $("#Table_pagination").css("display", "flex")
    SearchTable = [];
    AccountData.forEach((i) => {
        if (i.toLowerCase().indexOf($("#searchBtn").val().toLowerCase()) > -1) {
            SearchTable.push(i);
        }
    });
    searchClick();
});
// function search
function searchClick() {
    current_tablePage = 1;
    let pageAmount,
        Table_NumHtml = "",
        endNum = current_tablePage * 6,
        beginNum = endNum - 6,
        tableDisplay = "",
        active, isFirst, First, tablePageDisplay, Last;
    if ($("#searchBtn") != "") {
        pageAmount = Math.ceil(SearchTable.length / 6);
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
        currentTable = `Search`;
    } else {
        pageAmount = Math.ceil(AccountData.length / 6);
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += AccountData[i];
        }
        currentTable = `Main`;
    }
    switch (pageAmount) {
        case 1:
            First = 1
            Last = 1
            break;
        case 2:
            First = 1
            Last = 2
            break;
        default:
            isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
            First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
            tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
            Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;
    }

    Table_NumHtml +=
        '<li class="pagination-item" onclick="FirstPagination_click($(this),`' + currentTable + '`)">' +
        '<a class="">First</a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "pagination-item-active" : "";
        Table_NumHtml +=
            '<li class="pagination-item" onclick="Pagination_click($(this),`' + currentTable + '`)">' +
            '<a class="pagination-link ' + active + '">' + j + "</a></li>";
    }
    Table_NumHtml +=
        '<li class="pagination-item" onclick="LastPagination_click($(this),`' + currentTable + '`)">' +
        '<a class="">Last</a></li>';

    $("#Table_pagination").html(Table_NumHtml);

    if (tableDisplay.indexOf("undefined") != 0) {
        $("#adminTable").html(tableDisplay);
    } else {
        $("#adminTable").html("");
        $("#Table_pagination").css("display", "none")
        $(".NullValue").css("display", "block")
        $(".NullValue b").html($("#searchBtn").val())
    }
}
// function tạo gợi ý
function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, n = 0,
            val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        $(".container__header-with-search-result").append(a);

        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase() && n < 5) {
                b = document.createElement("DIV");
                b.innerHTML =
                    "<strong>" +
                    arr[i].substr(0, val.length) +
                    "</strong>" +
                    arr[i].substr(val.length) +
                    "<input type='hidden' value='" +
                    arr[i] +
                    "'>";

                // click các gợi ý trong  - 'Đề xuất cho bạn'
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    SearchTable = [];
                    AccountData.forEach((i) => {
                        if (i.toLowerCase().indexOf(inp.value.toLowerCase()) > -1) {
                            SearchTable.push(i);
                        }
                    });
                    searchClick();
                    closeAllLists();
                });
                a.appendChild(b);
                n += 1;
            }
        }
    });

    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

