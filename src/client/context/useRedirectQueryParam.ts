import { useHistory, useLocation } from 'react-router-dom';

const useRedirectQueryParam = () => {
  const { search } = useLocation();
  const history = useHistory();
  const [, redirectParam] = search.match(/redirect=([^&]*)/) || [];
  const redirectDestination = decodeURIComponent(redirectParam || '') || '/';

  const redirect = () => {
    history.push(redirectDestination);
  };
  return redirect;
};

export default useRedirectQueryParam;
