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

//nếu chưa đăng nhập => login.html
$(document).ready(function () {
    // kiểm tra xem có session login ko
    if (sessionStorage.getItem("login") == null) {
        $(location).attr("href", "./login.html");
    }
});

// Language.onchange = () => {
//     switch (Language.value) {
//         case "1": // Anh
//             LanguageIndex = 1;
//             break;
//         case "2": // TBN
//             LanguageIndex = 2;
//             break;
//         case "3": // Phap
//             LanguageIndex = 3;
//             break;
//         case "4":
//             LanguageIndex = 4;
//             break;
//     }
// };

searchButton.onclick = () => {
    // let LanguageName = $("#LanguageId  option:selected").text();
    Errortext.style.visibility = "hidden"; // ẩn thông báo lỗi

    Content.style.display = "none";
    adjective.innerHTML = "";
    interjection.innerHTML = "";
    verb.innerHTML = "";
    adverb.innerHTML = "";
    noun.innerHTML = "";
    Synonyms.innerHTML = "";
    Antonyms.innerHTML = "";
    Phonetics.innerHTML = "";
    console.log(Language.value);

    switch (Language.value) {
        case "1": // Tiếng anh
            if (searchBox.value) {
                fetchApi(searchBox.value);
            }
            break;
        case "2": // Tiếng TBN
            // Code Here
            // alert(`Chưa làm ngôn ngữ ${LanguageName}`);
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
};

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
        Errortext.style.visibility = "visible"; // hiện thông báo lỗi
        Content.style.display = "none"; // Ẩn content
    } else {
        Errortext.style.visibility = "hidden"; // ẩn thông báo lỗi
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
                        if (adverb.innerText.length == 0)
                            adverb.innerHTML = WordList;
                        break;
                    case "interjection": // thán từ
                        if (interjection.innerText.length == 0)
                            interjection.innerHTML = WordList;
                        break;
                    case "noun": // danh từ
                        if (noun.innerText.length == 0)
                            noun.innerHTML = WordList;
                        break;
                    case "verb": // động từ
                        if (verb.innerText.length == 0)
                            verb.innerHTML = WordList;
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
    interjectiontxt.style.display =
        interjection.textContent.length == 0 ? "none" : "list-item"; // thán từ
    adjectivetxt.style.display =
        adjective.textContent.length == 0 ? "none" : "list-item"; // tính từ
    adverbtxt.style.display =
        adverb.textContent.length == 0 ? "none" : "list-item"; // trạng từ
    Synonymstxt.style.display =
        Synonyms.textContent.length == 0 ? "none" : "list-item"; // đồng nghĩa
    Antonymstxt.style.display =
        Antonyms.textContent.length == 0 ? "none" : "list-item"; // trái nghĩa
    verbtxt.style.display = verb.textContent.length == 0 ? "none" : "list-item"; // Động từ
    nountxt.style.display = noun.textContent.length == 0 ? "none" : "list-item"; // danh từ
}

let Antonyms_Synonyms = (defi) => {
    // hàm trả về HTML các từ đồng nghĩa và trái nghĩa
    let Antonyms_Synonyms_List = `<li>`;
    defi.forEach((i) => {
        Antonyms_Synonyms_List +=
            `<u onclick=WordClick("${i.replaceAll(" ", "_")}")>` + i + `</u>  `;
    });
    Antonyms_Synonyms_List += `</li>`;
    return Antonyms_Synonyms_List;
};
function Oxford_data(data, word) {
    audio = undefined;
    console.log(data);
    let lexicalEntries, entries, senses, WordList, Antonyms_Synonyms_List;
    if (data.error) {
        // nếu độ dài mảng = undefined thì báo lỗi ko tìm thấy
        Errortext.innerHTML = `Couldn't find any results for <b>${word} </b>`;
        Errortext.style.visibility = "visible"; // hiện thông báo lỗi
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
                                `<u onclick=WordClick("${u.text.replaceAll(
                                    " ",
                                    "_"
                                )}")>` +
                                u.text +
                                `</u>  `;
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
                    if (adverb.innerText.length == 0)
                        adverb.innerHTML = WordList;
                    break;
                case "interjection": // thán từ
                    if (interjection.innerText.length == 0)
                        interjection.innerHTML = WordList;
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
    const url = `http://localhost:5500/${word.replaceAll(
        " ",
        "_"
    )}+${language_code}`;
    fetch(url, { method: "GET", mode: "cors" })
        .then((res) => res.json())
        .then((data) => Oxford_data(data, word));
}
// function Es_API(word) {
//     const url = `http://localhost:5500/${word.replaceAll(" ", "_")}+es`;
//     fetch(url, { method: "GET", mode: "cors" })
//         .then((res) => res.json())
//         .then((data) => Oxford_data(data, word));
// }
// function Fr_API(word) {
//     const url = `http://localhost:5500/${word.replaceAll(" ", "_")}+fr`;
//     fetch(url, { method: "GET", mode: "cors" })
//         .then((res) => res.json())
//         .then((data) => Oxford_data(data, word));
// }
// function Gr_API(word) {
//     const url = `http://localhost:5500/${word.replaceAll(" ", "_")}+gu`;
//     fetch(url, { method: "GET", mode: "cors" })
//         .then((res) => res.json())
//         .then((data) => Oxford_data(data, word));
// }
// function Hi_API(word) {
//     const url = `http://localhost:5500/${word.replaceAll(" ", "_")}+hi`;
//     fetch(url, { method: "GET", mode: "cors" })
//         .then((res) => res.json())
//         .then((data) => Oxford_data(data, word));
// }
// function Lv_API(word) {
//     const url = `http://localhost:5500/${word.replaceAll(" ", "_")}+lv`;
//     fetch(url, { method: "GET", mode: "cors" })
//         .then((res) => res.json())
//         .then((data) => Oxford_data(data, word));
// }
// function Ro_API(word) {
//     const url = `http://localhost:5500/${word.replaceAll(" ", "_")}+ro`;
//     fetch(url, { method: "GET", mode: "cors" })
//         .then((res) => res.json())
//         .then((data) => Oxford_data(data, word));
// }
// function Sw_API(word) {
//     const url = `http://localhost:5500/${word.replaceAll(" ", "_")}+sw`;
//     fetch(url, { method: "GET", mode: "cors" })
//         .then((res) => res.json())
//         .then((data) => Oxford_data(data, word));
// }
// function Ta_API(word) {
//     const url = `http://localhost:5500/${word.replaceAll(" ", "_")}+ta`;
//     fetch(url, { method: "GET", mode: "cors" })
//         .then((res) => res.json())
//         .then((data) => Oxford_data(data, word));
// }
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
