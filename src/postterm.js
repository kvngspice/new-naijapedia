/*fetch('http://localhost:3000/api/terms', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    term_name: 'Example',
    definition: 'An example term',
    example: 'This is an example'
  })
})
.then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to create term');
  }
})
.then((data) => {
  console.log(data.message);
})
.catch((err) => {
  console.error(err);
});*/
