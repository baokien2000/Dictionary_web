// BUG
// 0

let Errortext = document.querySelector("#error"),
    searchBox = document.getElementById("searchBox"),
    searchButton = document.getElementById("searchbtn"),
    Synonyms = document.getElementById("Synonyms"),
    Antonyms = document.getElementById("Antonyms"),
    Vocabulary = document.querySelector(".vocabulary p"),
    Phonetics = document.querySelector(".vocabulary span"),
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

Language.onchange = () => {
    switch (Language.value) {
        case "1": // Anh
            LanguageIndex = 1;
            break;
        case "2": // Việt
            LanguageIndex = 2;
            break;
        case "3":
            LanguageIndex = 3;
            break;
        case "4":
            LanguageIndex = 4;
            break;
    }
};

searchButton.onclick = () => {
    let LanguageName = $("#LanguageId  option:selected").text();
    switch (LanguageIndex) {
        case 1: // Tiếng anh
            if (searchBox.value) {
                Content.style.display = "none";
                adjective.innerHTML = "";
                interjection.innerHTML = "";
                verb.innerHTML = "";
                adverb.innerHTML = "";
                noun.innerHTML = "";
                Synonyms.innerHTML = "";
                Antonyms.innerHTML = "";
                fetchApi(searchBox.value);
                searchBox.value = "";
            }
            break;

        case 2: // Tiếng Việt
            // Code Here
            alert(`Chưa làm ngôn ngữ ${LanguageName}`);
            break;

        case 3: // Tiếng Pháp
            // Code Here
            alert(`Chưa làm ngôn ngữ ${LanguageName}`);
            break;

        case 4: // Tiếng Nga
            // Code Here
            alert(`Chưa làm ngôn ngữ ${LanguageName}`);
            break;
    }
};
audioIcon.onclick = () => {
    // Audio Onclick
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
    if (result.length == undefined) {
        // nếu độ dài mảng = undefined thì báo lỗi ko tìm thấy
        Errortext.innerHTML = `Couldn't find any results for <b>${word} </b>`;
        Errortext.style.visibility = "visible"; // hiện thông báo lỗi
        Content.style.display = "none"; // Ẩn content
    } else {
        // nếu có kết quả
        Errortext.style.visibility = "hidden"; // ẩn thông báo lỗi

        // từ vựng
        Vocabulary.innerHTML = word;

        console.log(result);

        // Phát âm
        let phontic = result[0].phonetics.length; //
        try {
            if (phontic == 1) {
                Phonetics.innerHTML = `${result[0].phonetics[0].text}`;
            } else {
                Phonetics.innerHTML = `${result[0].phonetics[1].text}`;
            }
            if (Phonetics.textContent == undefined) {
                // nếu số phân tử của mang
                Phonetics.innerHTML = ``;
            }
        } catch (e) {
            Phonetics.innerHTML = ``;
        }

        result.forEach((i) => {
            // chạy từng mảng nhỏ trong result
            let meaning = i.meanings;
            let phonetics = i.phonetics;
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
            });
            if (audio == undefined) {
                // sau khi chạy xong dòng for trên nếu audio vẫn bằng undefined
                audioIcon.style.display = "none"; // thì ẩn icon đi
            }

            meaning.forEach((j) => {
                // chạy từng mảng nhỏ trong meaning
                let defi = j.definitions;
                let WordList = ``;
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

    // thán từ
    if (interjection.textContent.length == 0) {
        interjectiontxt.style.display = "none";
    } else {
        interjectiontxt.style.display = "list-item";
    }
    // Động từ
    if (verb.textContent.length == 0) {
        verbtxt.style.display = "none";
    } else {
        verbtxt.style.display = "list-item";
    }
    // Danh từ
    if (noun.textContent.length == 0) {
        nountxt.style.display = "none";
    } else {
        nountxt.style.display = "list-item";
    }
    // tính từ
    if (adjective.textContent.length == 0) {
        adjectivetxt.style.display = "none";
    } else {
        adjectivetxt.style.display = "list-item";
    }
    // trạng từ
    if (adverb.textContent.length == 0) {
        adverbtxt.style.display = "none";
    } else {
        adverbtxt.style.display = "list-item";
    }
    // đồng nghĩa
    if (Synonyms.textContent.length == 0) {
        Synonymstxt.style.display = "none";
    } else {
        Synonymstxt.style.display = "block";
    }
    // trái nghĩa
    if (Antonyms.textContent.length == 0) {
        Antonymstxt.style.display = "none";
    } else {
        Antonymstxt.style.display = "block";
    }
}

// const CountWord = (defi) => {
//     let WordList = ``;
//     defi.forEach((i) => {
//         WordList += `<li>` + i + `</li>`;
//     });
//     return WordList;
// };

let Antonyms_Synonyms = (defi) => {
    // hàm trả về HTML các từ đồng nghĩa và trái nghĩa
    let WordList = `<li>`;
    defi.forEach((i) => {
        WordList +=
            `<u onclick=WordClick("${i.replaceAll(" ", "_")}")>` + i + `</u>  `;
    });
    WordList += `</li>`;
    return WordList;
};

function fetchApi(word) {
    // hàm trả về kết quả Dictionary EN
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url)
        .then((res) => res.json())
        .then((result) => data(result, word));
}
// Event click vào các từ đồng nghĩa,trái nghĩa
function WordClick(word) {
    adjective.innerHTML = "";
    interjection.innerHTML = "";
    verb.innerHTML = "";
    adverb.innerHTML = "";
    noun.innerHTML = "";
    Synonyms.innerHTML = "";
    Antonyms.innerHTML = "";
    fetchApi(word.replaceAll("_", " "));
    searchBox.value = "";
}
