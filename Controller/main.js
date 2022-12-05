// BUG
// 0

let Errortext = document.querySelector("#error"),
    searchBox = document.getElementById("searchBox"),
    searchButton = document.getElementById("searchbtn"),
    Synonyms = document.getElementById("Synonyms"),
    Antonyms = document.getElementById("Antonyms"),
    Vocabulary = document.querySelector(".vocabulary p"),
    Phonetics = document.querySelector(".vocabulary #En_Phonetics"),
    Content = document.querySelector(".content"),
    adjective = document.getElementById("Adjective"),
    adverb = document.getElementById("Adverb"),
    interjection = document.getElementById("Interjection"),
    noun = document.getElementById("Noun"),
    verb = document.getElementById("Verb"),
    verbtxt = document.getElementById("VerbText"),
    adverbtxt = document.getElementById("AdverbText"),
    interjectiontxt = document.getElementById("InterjectionText"),
    adjectivetxt = document.getElementById("AdjectiveText"),
    nountxt = document.getElementById("NounText"),
    Synonymstxt = document.getElementById("SynonymsText"),
    Antonymstxt = document.getElementById("AntonymsText"),
    Language = document.getElementById("LanguageId"),
    audioIcon = document.getElementById("audioIcon"),
    LanguageIndex = 1,
    audio;
// kiểm tra xem có session login ko
//nếu chưa đăng nhập => login.html
if (sessionStorage.getItem("login") == null || sessionStorage.getItem("login") == "") {
    $(location).attr("href", "../View/login.html");
}

$(".container").css("display", "block");

$("#userBar p").html(sessionStorage.getItem("user"));
// $("#userIcon").click(function () {
//     $("#userBar").css("display", "block")
// })
$("html").click(function (e) {
    if (e.target.id != "userBar") {
        $("#userBar").css("display", "none");
    }
    if (e.target.id == "userIcon") {
        $("#userBar").css("display", "block");
    }
});

$("#btn-changePass").click(function () {
    let name = $("#userBar p").html(),
        OldPass = $("#PassWordID").val(),
        NewPass = $("#NewPassWordID").val(),
        ReNewPass = $("#ReNewPassWordID").val(),
        PassCheck = false,
        id;

    $.get(
        "http://localhost:8080/account/login.php",
        {
            name: name,
            password: OldPass,
        },
        function (data, status) {
            if (OldPass.length != 0 && NewPass.length != 0 && ReNewPass.length != 0) {
                if (data["data"].length == 1) {
                    if (NewPass.length < 6) {
                        $("#ErrorMessage").html("Passwords must be at least 6 characters");
                        $("#ErrorMessage").css("visibility", "visible");
                        $("#NewPassWordID").css("border", "1px solid red");
                        $("#NewPassWordID").focus();
                    } else {
                        if (NewPass == ReNewPass) {
                            if (NewPass != OldPass) {
                                $.post("http://localhost:8080/account/update-password.php", {
                                    id: data["data"][0].id,
                                    password: NewPass,
                                });
                                $("#ErrorMessage").css("visibility", "hidden");
                                $(".modal input").css("border", "1px solid transparent");
                                $("#PassWordID").val("");
                                $("#NewPassWordID").val("");
                                $("#ReNewPassWordID").val("");
                                alert("Change password successfully");
                                $("#myEditModal").css("display", "none");
                            } else {
                                $("#ErrorMessage").html("The new password cannot be the same as the current password.");
                                $("#ErrorMessage").css("visibility", "visible");
                                $("#NewPassWordID").css("border", "1px solid red");
                                $("#NewPassWordID").focus();
                            }
                        } else {
                            $("#ErrorMessage").html("New Password does not match");
                            $("#ErrorMessage").css("visibility", "visible");
                            $("#NewPassWordID").css("border", "1px solid red");
                            $("#ReNewPassWordID").css("border", "1px solid red");
                            $("#NewPassWordID").focus();
                        }
                    }
                } else {
                    $("#ErrorMessage").html("Old password is not correct");
                    $("#ErrorMessage").css("visibility", "visible");
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
                $("#ErrorMessage").html("Please enter full information");
                $("#ErrorMessage").css("visibility", "visible");
            }
        },
        "json"
    );
});
$("#PassWordID").keypress(function () {
    if (event.key === "Enter") {
        event.preventDefault();
        if ($("#NewPassWordID").val() == "") {
            $("#NewPassWordID").focus();
        } else {
            $("#btn-changePass").click();
        }
    }
});
$("#NewPassWordID").keypress(function () {
    if (event.key === "Enter") {
        event.preventDefault();
        if ($("#ReNewPassWordID").val() == "") {
            $("#ReNewPassWordID").focus();
        } else {
            $("#btn-changePass").click();
        }
    }
});
$("#ReNewPassWordID").keypress(function () {
    if (event.key === "Enter") {
        $("#btn-changePass").click();
    }
});

$("#LogoutBtn").click(function () {
    $("#myModal").css("display", "flex");
});
$("#ForgotBtn").click(function () {
    $("#myEditModal").css("display", "flex");
});

$(".btn-close").click(function () {
    $(".modal").css("display", "none");
    $("#ErrorMessage").css("visibility", "hidden");
    $(".modal input").css("border", "1px solid transparent");
    $(".modal input").val("");
});
$(".modal input").click(function () {
    $("#ErrorMessage").css("visibility", "hidden");
    $(".modal input").css("border", "1px solid transparent");
});
function hideError() {
    $("#ErrorMessage").css("visibility", "hidden");
    $(".modal input").css("border", "1px solid transparent");
}
$(".XIcon").click(function () {
    $(".modal").css("display", "none");
    $("#ErrorMessage").css("visibility", "hidden");
    $(".modal input").css("border", "1px solid transparent");
    $(".modal input").val("");
});

$("#btn-logOut").click(function () {
    sessionStorage.setItem("login", "");
    sessionStorage.setItem("user", "");
    $(location).attr("href", "../View/login.html");
});

$("#searchBox").keypress(function () {
    if (event.key === "Enter") {
        event.preventDefault();
        searchWord();
        $("#searchBox").blur();
    }
});
searchButton.onclick = () => {
    searchWord();
    $("#searchBox").blur();
};
function searchWord() {
    Errortext.style.display = "none";
    Content.style.display = "none";
    adjective.innerHTML = "";
    interjection.innerHTML = "";
    verb.innerHTML = "";
    adverb.innerHTML = "";
    noun.innerHTML = "";
    Synonyms.innerHTML = "";
    Antonyms.innerHTML = "";
    Phonetics.innerHTML = "";

    switch (Language.value) {
        case "1": // Tiếng anh
            if (searchBox.value) {
                fetchApi(searchBox.value);
            }
            break;
        case "2": // Tiếng TBN
            // Code Here
            Oxford_API(searchBox.value, "es");
            break;
        case "3": // Tiếng Pháp
            Oxford_API(searchBox.value, "fr");
            break;
        case "4": // Tiếng Gujarati
            // Code Here
            Oxford_API(searchBox.value, "gu");
            break;
        case "5": // Tiếng
            // Code Here
            Oxford_API(searchBox.value, "hi");
            break;
        case "6": // Tiếng
            // Code Here
            Oxford_API(searchBox.value, "lv");
            break;
        case "7": // Tiếng
            // Code Here
            Oxford_API(searchBox.value, "ro");
            break;

        case "8": // Tiếng
            // Code Here
            Oxford_API(searchBox.value, "sw");
            break;
        case "9": // Tiếng
            // Code Here
            Oxford_API(searchBox.value, "ta");
            break;
    }
    searchBox.value = "";
}
// Audio Onclick
audioIcon.onclick = () => {
    audio.play(); // phát âm thanh
};

// Do API này nó là 1 mảng lớn result và bên trong có nhiêu mảng nhỏ
// mỗi mảng có một nội dung khác nhau
// và số lượng mảng của mỗi từ lại khác nhau
// vdd search từ 'abc'
// result[0] có định nghĩa trạng từ
// result[1] có định nghĩa tính từ, thán từ
// result[2] có âm thanh , thán từ
// result[n] ....
// nên phải chạy khá nhiều vòng FOR đê có thể lấy được hết nội dung cần thiết

function data(result, word) {
    // result -> mảng kết quả , word -> từ vựng
    let meaning, phonetics, defi, WordList;
    if (result.length == undefined) {
        // nếu độ dài mảng = undefined thì báo lỗi ko tìm thấy
        Errortext.innerHTML = `Couldn't find any results for <b>${word} </b>`;
        Errortext.style.display = "block"; // hiện thông báo lỗi
        Content.style.display = "none"; // Ẩn content
    } else {
        Errortext.style.display = "none"; // ẩn thông báo lỗi
        Vocabulary.innerHTML = word; // từ vựng

        // Phát âm
        result.forEach((i) => {
            // chạy từng mảng nhỏ trong result
            meaning = i.meanings;
            phonetics = i.phonetics;
            audio = undefined;

            //audio
            phonetics.forEach((k) => {
                // chạy từng mảng nhỏ trong phonetics
                if (k.audio && audio == undefined) {
                    // nếu k.audio có tồn tại
                    audio = new Audio(k.audio);
                    audioIcon.style.display = "inline-block";
                    return true;
                }
                if (k.text && Phonetics.textContent == "") {
                    // nếu k.text có tồn tại
                    Phonetics.innerHTML = `${k.text}`;
                    return true;
                }
            });

            meaning.forEach((j) => {
                // chạy từng mảng nhỏ trong meaning
                defi = j.definitions;
                WordList = ``;
                defi.forEach((k) => {
                    WordList += `<li>` + k.definition + `</li>`; // chạy từng mảng nhỏ trong definitions
                    if (k.example != undefined) {
                        // check xem nó có vd hay ko
                        WordList += `<span>Example</span>
                            <ul>
                                <li><i>${k.example}</i></li>
                            </ul>
                            `; // lưu hết vào WordList
                    }
                });
                switch (
                j.partOfSpeech // check xem j.partOfSpeech là loại từ gì
                ) {
                    case "adjective": // trạng từ
                        if (adjective.innerText.length == 0)
                            // check xem adjective.innerText đã có nội dung chưa
                            adjective.innerHTML = WordList; // nếu chưa có thì thêm vào
                        break;
                    case "adverb": // trạng từ
                        if (adverb.innerText.length == 0) adverb.innerHTML = WordList;
                        break;
                    case "interjection": // thán từ
                        if (interjection.innerText.length == 0) interjection.innerHTML = WordList;
                        break;
                    case "noun": // danh từ
                        if (noun.innerText.length == 0) noun.innerHTML = WordList;
                        break;
                    case "verb": // động từ
                        if (verb.innerText.length == 0) verb.innerHTML = WordList;
                        break;
                }
                if (j.antonyms.length) {
                    // check xem có từ trái nghĩa ko
                    Antonyms.innerHTML = Antonyms_Synonyms(j.antonyms);
                }
                if (j.synonyms.length > 0) {
                    // check xem có từ đồng nghĩa ko
                    Synonyms.innerHTML = Antonyms_Synonyms(j.synonyms);
                }
            });
        });
        Content.style.display = "block"; // hiện content( nội dung)
    }

    // sau khi chạy hết dòng FOR trên thì check lại xem phần nào ko có
    // nội dung thì ẩn nó di
    hideNullContent();
}
function hideNullContent() {
    // ẩn các phần không có dữ liệu

    if (audio == undefined) {
        audioIcon.style.display = "none"; //audio
    }
    interjectiontxt.style.display = interjection.textContent.length == 0 ? "none" : "list-item"; // thán từ
    adjectivetxt.style.display = adjective.textContent.length == 0 ? "none" : "list-item"; // tính từ
    adverbtxt.style.display = adverb.textContent.length == 0 ? "none" : "list-item"; // trạng từ
    Synonymstxt.style.display = Synonyms.textContent.length == 0 ? "none" : "block"; // đồng nghĩa
    Antonymstxt.style.display = Antonyms.textContent.length == 0 ? "none" : "block"; // trái nghĩa
    verbtxt.style.display = verb.textContent.length == 0 ? "none" : "list-item"; // Động từ
    nountxt.style.display = noun.textContent.length == 0 ? "none" : "list-item"; // danh từ
}

let Antonyms_Synonyms = (defi) => {
    // hàm trả về HTML các từ đồng nghĩa và trái nghĩa
    let Antonyms_Synonyms_List = `<li>`;
    defi.forEach((i) => {
        Antonyms_Synonyms_List += `<u onclick=WordClick("${i.replaceAll(" ", "_")}")>` + i + `</u>  `;
    });
    Antonyms_Synonyms_List += `</li>`;
    return Antonyms_Synonyms_List;
};
function Oxford_data(data, word) {
    audio = undefined;
    let lexicalEntries, entries, senses, WordList, Antonyms_Synonyms_List;
    if (data.error) {
        // nếu độ dài mảng = undefined thì báo lỗi ko tìm thấy
        Errortext.innerHTML = `Couldn't find any results for <b>${word} </b>`;
        Errortext.style.display = "block"; // hiện thông báo lỗi
        Content.style.display = "none"; // Ẩn content
    } else {
        Vocabulary.innerHTML = word; // từ vựng
        Antonyms_Synonyms_List = `<li>`;
        lexicalEntries = data.results[0].lexicalEntries;
        lexicalEntries.forEach((k) => {
            entries = k.entries;
            WordList = ``;

            entries.forEach((j) => {
                senses = j.senses;
                senses.forEach((h) => {
                    WordList += `<li>` + h.definitions[0] + `</li>`; // chạy từng mảng nhỏ trong definitions
                    // check xem nó có vd hay ko
                    if (h.examples != undefined) {
                        WordList += `<span>Example</span>
                            <ul>
                                <li><i>${h.examples[0].text}</i></li>
                            </ul>
                            `; // lưu hết vào WordList
                    }
                    if (h.synonyms != undefined) {
                        h.synonyms.forEach((u) => {
                            Antonyms_Synonyms_List +=
                                `<u onclick=WordClick("${u.text.replaceAll(" ", "_")}")>` + u.text + `</u>  `;
                        });
                    }
                });
            });
            switch (
            k.lexicalCategory.id // check xem j.partOfSpeech là loại từ gì
            ) {
                case "adjective": // trạng từ
                    if (adjective.innerText.length == 0)
                        // check xem adjective.innerText đã có nội dung chưa
                        adjective.innerHTML = WordList; // nếu chưa có thì thêm vào
                    break;
                case "adverb": // trạng từ
                    if (adverb.innerText.length == 0) adverb.innerHTML = WordList;
                    break;
                case "interjection": // thán từ
                    if (interjection.innerText.length == 0) interjection.innerHTML = WordList;
                    break;
                case "noun": // danh từ
                    if (noun.innerText.length == 0) noun.innerHTML = WordList;
                    break;
                case "verb": // động từ
                    if (verb.innerText.length == 0) verb.innerHTML = WordList;
                    break;
            }
        });
        Antonyms_Synonyms_List += `</li>`;
        // 9 = ("<li></li>").length
        if (Antonyms_Synonyms_List.length > 9) {
            Synonyms.innerHTML = Antonyms_Synonyms_List;
        }
        Content.style.display = "block"; // hiện content( nội dung)
    }
    hideNullContent();
}
function Oxford_API(word, language_code) {
    const url = `http://localhost:5500/${word.replaceAll(" ", "_")}+${language_code}`;
    fetch(url, { method: "GET", mode: "cors" })
        .then((res) => res.json())
        .then((data) => Oxford_data(data, word));
}

function fetchApi(word) {
    // hàm trả về kết quả Dictionary EN
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url)
        .then((res) => res.json())
        .then((result) => data(result, word));
}
// Event click vào các từ đồng nghĩa,trái nghĩa
function WordClick(word) {
    Content.style.display = "none";
    adjective.innerHTML = "";
    interjection.innerHTML = "";
    verb.innerHTML = "";
    adverb.innerHTML = "";
    noun.innerHTML = "";
    Synonyms.innerHTML = "";
    Antonyms.innerHTML = "";
    Phonetics.innerHTML = "";
    switch (Language.value) {
        case "1":
            fetchApi(word.replaceAll("_", " "));
            break;
        case "2":
            Oxford_API(word, "es");
            break;
        case "3":
            Oxford_API(word, "fr");
            break;
        case "4":
            Oxford_API(word, "gu");
            break;
        case "5":
            Oxford_API(word, "hi");
            break;
        case "6":
            Oxford_API(word, "lv");
            break;
        case "7":
            Oxford_API(word, "ro");
            break;
        case "8":
            Oxford_API(word, "sw");
            break;
        case "9":
            Oxford_API(word, "ta");
            break;
    }

    searchBox.value = "";
}
