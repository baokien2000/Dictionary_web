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

Language.onchange = () => {
    // console.log($("#LanguageId  option:selected").text());
    switch (Language.value) {
        case 1: // Anh
            LanguageIndex = 1;
            break;
        case 2: // Việt
            LanguageIndex = 2;
            break;
        case 3:
            LanguageIndex = 3;
            break;
        case 4:
            LanguageIndex = 4;
            break;
    }
};

// nếu chưa đăng nhập => login.html
$(document).ready(function () {
    if (sessionStorage.getItem("login") == null) {
        $(location).attr("href", "./login.html");
    }
});
searchButton.onclick = () => {
    let LanguageName = $("#LanguageId  option:selected").text();
    switch (LanguageIndex) {
        case 1:
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
        case 2:
            alert(`Chưa làm ngôn ngữ ${LanguageName}`);
            break;
        case 3:
            alert(`Chưa làm ngôn ngữ ${LanguageName}`);
            break;
        case 4:
            alert(`Chưa làm ngôn ngữ ${LanguageName}`);
            break;
    }
};
audioIcon.onclick = () => {
    audio.play();
};

function data(result, word) {
    if (result.length == undefined) {
        Errortext.innerHTML = `Couldn't find any results for <b>${word} </b>`;
        Errortext.style.visibility = "visible";
        Content.style.display = "none";
    } else {
        Errortext.style.visibility = "hidden";

        let phontic = result[0].phonetics.length;

        console.log(result);
        // từ vựng
        Vocabulary.innerHTML = word;
        // Phát âm
        try {
            if (result[0].phonetics[0].text == undefined) {
                Phonetics.innerHTML = ``;
            }
            if (phontic == 1) {
                Phonetics.innerHTML = `${result[0].phonetics[0].text}`;
            } else {
                Phonetics.innerHTML = `${result[0].phonetics[1].text}`;
            }
        } catch (e) {
            Phonetics.innerHTML = ``;
        }

        result.forEach((i) => {
            let meaning = i.meanings;
            let phonetics = i.phonetics;
            audio = undefined;
            //audio
            phonetics.forEach((k) => {
                if (k.audio && audio == undefined) {
                    audio = new Audio(k.audio);
                    audioIcon.style.display = "inline-block";
                    return true;
                }
            });
            if (audio == undefined) {
                audioIcon.style.display = "none";
            }

            meaning.forEach((j) => {
                let defi = j.definitions;
                let WordList = ``;
                defi.forEach((k) => {
                    WordList += `<li>` + k.definition + `</li>`;
                    if (k.example != undefined) {
                        WordList += `<span>Example</span>
                            <ul>
                                <li><i>${k.example}</i></li>
                            </ul>
                            `;
                    }
                });
                switch (j.partOfSpeech) {
                    case "adjective":
                        if (adjective.innerText.length == 0)
                            adjective.innerHTML = WordList;
                        break;
                    case "adverb":
                        if (adverb.innerText.length == 0)
                            adverb.innerHTML = WordList;
                        break;
                    case "interjection":
                        if (interjection.innerText.length == 0)
                            interjection.innerHTML = WordList;
                        break;
                    case "noun":
                        if (noun.innerText.length == 0)
                            noun.innerHTML = WordList;
                        break;
                    case "verb":
                        if (verb.innerText.length == 0)
                            verb.innerHTML = WordList;
                        break;
                }
                if (j.antonyms.length) {
                    Antonyms.innerHTML = Antonyms_Synonyms(j.antonyms);
                }
                // từ đồng nghĩa
                if (j.synonyms.length > 0) {
                    Synonyms.innerHTML = Antonyms_Synonyms(j.synonyms);
                }
            });
        });
        Content.style.display = "block";
    }

    if (interjection.textContent.length == 0) {
        interjectiontxt.style.display = "none";
    } else {
        interjectiontxt.style.display = "list-item";
    }
    if (verb.textContent.length == 0) {
        verbtxt.style.display = "none";
    } else {
        verbtxt.style.display = "list-item";
    }
    if (noun.textContent.length == 0) {
        nountxt.style.display = "none";
    } else {
        nountxt.style.display = "list-item";
    }
    if (adjective.textContent.length == 0) {
        adjectivetxt.style.display = "none";
    } else {
        adjectivetxt.style.display = "list-item";
    }
    if (adverb.textContent.length == 0) {
        adverbtxt.style.display = "none";
    } else {
        adverbtxt.style.display = "list-item";
    }
    if (Synonyms.textContent.length == 0) {
        Synonymstxt.style.display = "none";
    } else {
        Synonymstxt.style.display = "block";
    }
    if (Antonyms.textContent.length == 0) {
        Antonymstxt.style.display = "none";
    } else {
        Antonymstxt.style.display = "block";
    }
}

const CountWord = (defi) => {
    let WordList = ``;
    defi.forEach((i) => {
        WordList += `<li>` + i + `</li>`;
    });
    return WordList;
};
let Antonyms_Synonyms = (defi) => {
    let WordList = `<li>`;
    defi.forEach((i) => {
        WordList +=
            `<u onclick=WordClick("${i.replaceAll(" ", "_")}")>` + i + `</u>  `;
    });
    WordList += `</li>`;
    return WordList;
};

function fetchApi(word) {
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
