import showPopup from './showPopup';

const wordInput = document.getElementById('word');
const definitionInput = document.getElementById('definition');
const useInSentInput = document.getElementById('use-in-sentence');
const addWordBtn = document.getElementById('add-word-btn');

addWordBtn.addEventListener('click', addDefinition);

function addDefinition() {
    const term_name = wordInput.value;
    const definition = definitionInput.value;
    const example = useInSentInput.value;

    const term = { term_name, definition, example }; 

    addTerm(term)
}

function addTerm(newTerm) {
    return fetch('http://localhost:8000/api/terms/vet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTerm)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      showPopup('word added sucessfully', true);
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
