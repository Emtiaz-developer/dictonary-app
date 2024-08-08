const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    getWordInfo(form.elements[0].value);
})

const getWordInfo = async (word) =>{
  
   try{
    resultDiv.innerHTML = "Feathing Data......";
    const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((res) => res.json());
    let definitions = data[0].meanings[0].definitions[0];
    resultDiv.innerHTML = `
    <h2> <strong>Word : </strong> ${data[0].word} </h2>
    <p class = "parts"> ${data[0].meanings[0].partOfSpeech} </p>
    <p> <strong>Meanings : </strong> ${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
    <p><strong> Example : </strong> ${definitions.example === undefined ? "Not Found" : definitions.example}
    <p class = "anto"><strong>Antonyms : </strong></p>
    `
    if(definitions.antonyms.length === 0){
        resultDiv.innerHTML += `<span>Not Found</span>`
    }else{
        for(let i = 0; i<definitions.antonyms.length; i++){
            resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
        }
    }


    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="blank">Read More</a></div>`
    
   }catch(err){
    resultDiv.innerHTML = `<p>Sorry the word could not found</p>`;
   }   

    console.log(data);
}