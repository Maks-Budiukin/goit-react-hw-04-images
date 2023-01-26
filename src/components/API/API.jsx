export function API(request, page, perPage) {
    return fetch(`https://pixabay.com/api/?q=${request}&page=1&key=31301300-300be7510f84e8e4ecf9762e9&image_type=photo&orientation=horizontal&per_page=${perPage * page}`)
    .then(response => {
      if (!response.ok) {
          throw new Error(response.status);
      }
      return response.json();
    })
    
} 