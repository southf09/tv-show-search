const form = document.querySelector('#searchForm');
const container = document.querySelector('.container');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    showImages(res.data);
    form.elements.query.value = '';
})

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
            card.append(score);
            container.append(card);
        }
    }
}