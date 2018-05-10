const API_KEY = "AIzaSyCKpljZb_v_2BMCjoUQz7V8otxauRXVSFM";

const YOUTUBE_SEARCH_END_POINT = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    q: searchTerm,
    type: "video",
    key: API_KEY
  }
  $.getJSON(YOUTUBE_SEARCH_END_POINT, query, callback);
}

function renderResult(result) {
  return `
    <div class="result-container">
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
        <img src="${result.snippet.thumbnails.medium.url}" alt="Youtube - ${result.snippet.title}"/>
      </a>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
  $('.js-result-summary').html(`<p>Showing ${data.pageInfo.resultsPerPage} results</p>`);
}

function handleSubmit() {
  $('.js-search-form').submit(e => {
    e.preventDefault();
    
    const query = $('.js-query').val();

    // clear out the input
    $('.js-query').val("");
    
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(handleSubmit);