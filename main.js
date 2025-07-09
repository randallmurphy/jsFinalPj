 const zodiacForm = document.querySelector('#zodiac-form');
    const resultDiv = document.querySelector('#result');

    zodiacForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const sign = document.querySelector('#zodiac-select').value;

      // 👇 Proxy to bypass CORS
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const url = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=today`;

      try {
        const response = await fetch(proxy + url);
        const json = await response.json();
        console.log('API Response:', json);

        if (json && json.data) {
          displayHoroscope(json.data);
        } else {
          resultDiv.innerHTML = '<p>Unable to fetch horoscope. Please try again later.</p>';
        }
      } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    });

    function displayHoroscope(data) {
      const date = data.date || 'Today';
      const message = data.horoscope_data || 'No horoscope message available.';

      resultDiv.innerHTML = `
        <h2>Horoscope for ${date}</h2>
        <p>${message}</p>
      `;
    }

    //https://cors-anywhere.herokuapp.com/corsdemo