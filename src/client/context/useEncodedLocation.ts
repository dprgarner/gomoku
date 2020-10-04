import { useLocation } from 'react-router-dom';
import { createPath } from 'history';

const useEncodedLocation = () => {
  const location = useLocation();
  const path = createPath(location);
  return encodeURIComponent(path);
};

export default useEncodedLocation;
