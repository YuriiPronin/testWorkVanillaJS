
if (!window.location.search.includes('a=') && !window.location.search.includes('b=')) {
  window.location = 'https://test-work-vanilla-js.vercel.app//index?a=1&b=2';
}

function handleSubmit(event) {
  
  const form = event.target.closest('form');
  
  const a = form.querySelector('input[name="a"]').value;
  const b = form.querySelector('input[name="b"]').value;

  const urlParams = new URLSearchParams(window.location.search);
  const queryParams = {};
  urlParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  const formData = {
    a: a,
    b: b,
    params: queryParams
  };

  console.log('formData', formData);

  try {
    fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  catch(error) {
    console.log('there is no backend yet, so...', error)
  }
  finally {
    window.open(`https://www.google.com/index?a=${formData.a}&b=${formData.b}`, '_blank');
  }
}

const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', handleSubmit);
});

function handleLinkClick(event) {
  event.preventDefault();
  handleSubmit(event);
}

const submitLink = document.getElementById('linkBtn');
submitLink.addEventListener('click', handleLinkClick);
