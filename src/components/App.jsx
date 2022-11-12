import { Component } from 'react';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { fetchImages } from '../services/fetchImages';
import { Button } from './Button';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    error: null,
    loaded: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page)
      try {
        this.setState({ loaded: true });

        const searchImages = await fetchImages(searchQuery, page);
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...searchImages],
          };
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ loaded: false });
      }
  }

  getSearchQuery = event => {
    event.preventDefault();
    const inputValue = event.target.elements.query.value.trim().toLowerCase();

    this.setState({ searchQuery: inputValue, page: 1, images: [] });
  };

  onLoadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { searchQuery, images, loaded } = this.state;
    return (
      <>
        <Searchbar handleSubmit={this.getSearchQuery} />
        {loaded ? <p>LOADING...</p> : null}
        {searchQuery && <ImageGallery imageItems={images} />}
        {images.length > 0 && !loaded && (
          <Button handleClickLoadMore={this.onLoadMoreImages}>Load more</Button>
        )}
      </>
    );
  }
}

export default App;

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
