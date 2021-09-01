import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import shortid from 'shortid';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import { fetchImages, NUMBER_OF_PHOTOS } from './services/api';
import Button from './components/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    requestName: '',
    imgArray: [],
    numPage: 1,
    loading: false,
    isMoreAvailable: false,
    // image: null,
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const { requestName, numPage } = this.state;

    if (prevState.requestName !== requestName) {
      this.imageApiService(requestName, numPage);
    }
  }

  imageApiService = () => {
    const { requestName, numPage } = this.state;
    this.setState({ loading: true });

    fetchImages(requestName, numPage)
      .then(response => {
        if (response.hits.length === 0) {
          this.setState({ error: true, status: Status.REJECTED });
          toast.error('Something went wrong! Please enter a correct request.');
          return;
        }

        const isMoreAvailable = this.checkAvailability(response.hits.length);

        this.setState({
          imgArray: [...this.state.imgArray, ...response.hits],
          isMoreAvailable,
          status: Status.RESOLVED,
        });

        // if (response.hits.length < 12) {
        //   this.setState({ status: Status.IDLE });
        //   toast.info('No more photos for your request');
        //   return response.hits;
        // }

        toast.success('Congratulations! You found your photo.', {
          icon: '🚀',
        });
        // return response.hits;
      })
      .then(
        () => {
          if (numPage !== 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        },
        // images => this.setState({ images }),
        // this.setState({ status: Status.RESOLVED }),
      )
      .catch(error => this.setState({ error, status: Status.REJECTED }))
      .finally(() => this.setState({ loading: false }));
  };

  handleFormSubmit = requestName => {
    this.setState({ requestName, imgArray: [], numPage: 1 });
  };

  handleLoadMore = () => {
    this.imageApiService();
    this.setState(() => ({ numPage: this.state.numPage + 1 }));
  };

  // ===
  checkAvailability = itemsLength => {
    return !(itemsLength < NUMBER_OF_PHOTOS);
  };

  render() {
    const { loading, imgArray, requestName, status } = this.state;

    return (
      <div className="Container">
        <Searchbar onSubmit={this.handleFormSubmit} />

        {loading && <h2 className="EnterYourRequest">Loading...</h2>}

        <ImageGallery images={imgArray} />
        {!requestName && (
          <h2 className="EnterYourRequest">Enter your request</h2>
        )}

        {status === Status.RESOLVED && !loading && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        <ToastContainer autoClose={3500} />
      </div>
    );
  }
}

export default App;

// API.fetchImages()
//   .then((hits) => {
//     if (hits.length === 0) {
//     refs.loadMoreImgBtn.style.display = 'none'
//     NOTE.onFetchError()
//   } else if (hits.length < 12) {
//     const markup = imageCard(hits)
//     renderImages(markup)
//     refs.loadMoreImgBtn.style.display = 'none'
//     NOTE.noMoreImgRequestAlert()
//   } else if (value) {
//     const markup = imageCard(hits)
//     renderImages(markup)
//     NOTE.onSuccessfulRequest()

//   }
// })
