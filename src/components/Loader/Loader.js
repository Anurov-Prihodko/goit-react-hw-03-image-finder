import { ImSpinner } from 'react-icons/im';
import ImageGalleryItem from '../ImageGalleryItem';
// import pendingImage from './pending.png';

const styles = {
  spinner: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
};

export default function Loader({ imgName }) {
  const image = {
    name: imgName,
    // sprites: {
    //   other: {
    //     'official-artwork': {
    //       front_default: pendingImage,
    //     },
    //   },
    // },
    stats: [],
  };

  return (
    <div role="alert">
      <div style={styles.spinner}>
        <ImSpinner size="32" className="icon-spin" />
        Loading...
      </div>
    </div>
  );
}
