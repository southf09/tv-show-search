const form = document.querySelector('#searchForm');
const container = document.querySelector('.container');

//On form submission, assigns the value in the search box
//to the 'searchTerm' variable, creates a query 
//containing this value, and adds the query to the end
//of the api call. It then calls the showImages function
//and resets the form input to ''

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    showImages(res.data);
    form.elements.query.value = '';
})

//Creates cards that contain the tv show data from the api
//call, and appends them to the container

const showImages = (shows) => {
    container.innerHTML = '';
    for(let result of shows){
        if (result.show.image) {
            const card = document.createElement('div');
            const img = document.createElement('img');
            const score = document.createElement('div');
            const rating = result.show.rating.average;
            score.innerText = `Rating: ${rating}`;
            img.src = result.show.image.medium;
            card.append(img);
            if(result.show.rating.average){
                card.append(score);
                container.append(card);
            }
            // card.append(score);
            // container.append(card);
        }
    }
};