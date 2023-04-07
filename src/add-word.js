import url from './url';

const { primaryApi } = url

const wordInput = document.getElementById('word');
const definitionInput = document.getElementById('definition');
const useInSentInput = document.getElementById('use-in-sentence');
const addWordBtn = document.getElementById('add-word-btn');

addWordBtn.addEventListener('click', addDefinition);

function showPopup(message, isSuccess = true) {
  const popup = document.createElement('div');
  popup.textContent = message;
  popup.classList.add('popup');
  popup.style.position = 'fixed';
  popup.style.top = '60px';
  popup.style.left = '50%';
  popup.style.transform = 'translateX(-50%)';
  popup.style.backgroundColor = isSuccess ? '#28a745' : '#dc3545';
  popup.style.color = '#ffffff';
  popup.style.padding = '10px';
  popup.style.borderRadius = '4px';
  popup.style.zIndex = '1000';
  popup.style.fontSize = '14px';
  popup.style.textAlign = 'center';
  popup.style.animation = 'fadeout 4s forwards';
  popup.style.animationDelay = '2s';

  document.body.appendChild(popup);

  setTimeout(() => {
      document.body.removeChild(popup);
      window.location.href = '/index.html';
  }, 6000);
}

export default showPopup;

function addDefinition() {
    const term_name = wordInput.value;
    const definition = definitionInput.value;
    const example = useInSentInput.value;

    const term = { term_name, definition, example }; 

    addTerm(term)
}

function addTerm(newTerm) {
    return fetch(`${primaryApi}api/terms/vet`, {
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
  
