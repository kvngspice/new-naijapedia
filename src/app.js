import './style.css'

import dictionary from './dictionary';
import showPopup from './showPopup';

document.getElementById('shareToTwitter').addEventListener('click', function() {
    const resultDiv = document.getElementById('result');
    const textToShare = resultDiv.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${textToShare}`;
    window.open(twitterUrl, '_blank');
});

getTerms();

document.getElementById('download-share').addEventListener('click', () => {
    downloadAndShare();
});

function addWord() {

}
 
/*Object.keys(dictionary).forEach((key, index) => {
    console.log(`${key} is at index ${index}`);

    console.log(key)
    fetch('http://localhost:3000/api/terms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        term_name: `${Object.keys(dictionary)[index]}`,
        definition: `${dictionary[key]['definition']}`,
        example: `${dictionary[key]['example']}`
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to create term');
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
});*/



  document.getElementById('search').addEventListener('keydown', function (event) {
                                                        if (event.key === 'Enter') {
                                                            event.preventDefault();
                                                            const word = event.target.value.trim();
                                                            searchWord(word);
                                                        }
                                                    });
                                                function searchWord(word = null) {
                                                    const searchInput = document.getElementById('search');
                                                    const resultDiv = document.getElementById('result');
                                                    const searchedWord = word || searchInput.value.toLowerCase();
                                                    const entry = dictionary[searchedWord];
                                                  
                                                
                                                    if (entry) {
                                                        resultDiv.innerHTML = `<p style="font-size: 24px;"><strong>${searchedWord}</strong> </p><br> <i>${entry.definition}</i><br><br><strong>Use in a sentence:</strong> ${entry.example}`;
                                                        showPopup(`"${searchedWord}" found!`, true);
                                                    } else {
                                                        const relatedWords = findRelatedWords(searchedWord);
                                                        if (relatedWords.length > 0) {
                                                            resultDiv.innerHTML = `<strong>${searchedWord}:</strong> not found in the dictionary.<br><strong>Did you mean:</strong>`;
                                                            relatedWords.forEach((relatedWord) => {
                                                                const relatedWordElement = document.createElement('span');
                                                                relatedWordElement.textContent = relatedWord;
                                                                relatedWordElement.classList.add('related-word');
                                                                relatedWordElement.addEventListener('click', () => searchWord(relatedWord));
                                                                resultDiv.appendChild(relatedWordElement);
                                                            });
                                                            showPopup(`"${searchedWord}" not found in the dictionary. but see related words`, false);
                                                        } else {
                                                            resultDiv.innerHTML = `<strong>${searchedWord}:</strong> not found in the dictionary.`;
                                                            showPopup(`"${searchedWord}" not found in the dictionary.`, false);
                                                        }
                                                    }
                                                }
                                                


function findRelatedWords(searchedWord) {
    const words = Object.keys(dictionary);
    const maxDifference = 1; // Maximum difference in characters allowed
    const relatedWords = [];

    words.forEach(word => {
        let diff = 0;
        for (let i = 0; i < Math.min(word.length, searchedWord.length); i++) {
            if (word[i] !== searchedWord[i]) {
                diff++;
                if (diff > maxDifference) break;
            }
        }

        if (diff <= maxDifference) relatedWords.push(word);
    });

    return relatedWords;
}

function displayFeaturedWords(terms) {
    const featuredWordsDiv = document.getElementById('featured-words');
    const arrThree = ['featured_one', 'featured_two', 'featured_three'];

    arrThree.forEach(item => {
        const randoNum = Math.floor(Math.random() * terms.length);
        const term = terms[randoNum];

        const {
            term_name,
            definition,
            example
        } = term

        const featuredWordDiv = document.createElement('div');
        featuredWordDiv.classList.add('featured-word');
        featuredWordDiv.innerHTML = `<strong>${term_name}:</strong> ${definition}  <b>Example:</b> ${example}`;
        featuredWordsDiv.appendChild(featuredWordDiv);
    });
}

function getTerms() {
    return fetch('http://localhost:8000/api/terms', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json()).then(data => {
        const terms = data.terms;
        displayAword(terms)
        displayFeaturedWords(terms);
    });
  }

 function displayAword(terms) {
    const randoNum = Math.floor(Math.random() * terms.length);
    const term = terms[randoNum];
    return displayToResult(term);
 }

 function displayToResult(term) {
    const resultDiv = document.getElementById('result');

    const {
        term_name,
        definition,
        example
    } = term

    resultDiv.innerHTML = `<p style="font-size: 24px;"><strong>${term_name}</strong></p> <br> <i>${definition}</i> <br><br><strong>Use in a sentence:</strong> ${example}`;
 }
  

async function downloadAndShare() {
    const resultDiv = document.getElementById('result');
    const offscreenDiv = document.createElement('div');
    offscreenDiv.classList.add('offscreen-result');
    offscreenDiv.innerHTML = resultDiv.innerHTML;
    const headerDiv = document.createElement('div');
          
    
    headerDiv.textContent = ('naijapedia.com');
    headerDiv.style.backgroundColor = '#007BFF';
    headerDiv.style.color = '#ffffff';
    headerDiv.style.padding = '10px';
    headerDiv.style.fontSize = '24px';
    headerDiv.style.fontWeight = 'bold';
    headerDiv.style.textAlign = 'center';
    
    // Add header to offscreenDiv
    offscreenDiv.insertBefore(headerDiv, offscreenDiv.firstChild);

    // Add custom styles here
    
    offscreenDiv.style.width = '300px';
    offscreenDiv.style.height = '300px';
    offscreenDiv.style.backgroundColor = '#ffffff';
    offscreenDiv.style.paddingRight = '30px';
    offscreenDiv.style.paddingLeft = '30px';
    offscreenDiv.style.borderRadius = '4px';
    offscreenDiv.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
    offscreenDiv.style.fontFamily = 'Arial, sans-serif';
    offscreenDiv.style.fontSize = '20px';

    document.body.appendChild(offscreenDiv);

    const canvas = await html2canvas(offscreenDiv, { backgroundColor: null });
    const imageDataUrl = canvas.toDataURL('image/png');
    document.body.removeChild(offscreenDiv);

    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = imageDataUrl;
    downloadLink.download = 'word-definition.png';
    downloadLink.style.display = 'none';

    // Append the download link to the body, click it, and then remove it
    document.body.appendChild(downloadLink);
    downloadLink.click();
    setTimeout(() => {
        document.body.removeChild(downloadLink);
    }, 100);

    if (navigator.share) {
        try {
            const blob = await (await fetch(imageDataUrl)).blob();
            const file = new File([blob], 'word-definition.png', { type: 'image/png' });
            await navigator.share({
                title: 'Word Definition',
                text: 'Check out this word definition!',
                files: [file],
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        alert('Sharing is not supported on this browser.');
    }
}
