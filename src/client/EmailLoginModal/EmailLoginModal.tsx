import * as React from 'react';

import EmailAddressView from './EmailAddressView';
import CreateUserView from './CreateUserView';
import EmailExistsView from './EmailExistsView';
import PaperModal from '../components/PaperModal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onError: (error: Error) => void;
  onLoginComplete: () => void;
};

type View = 'EMAIL' | 'CREATE' | 'EXISTS';

const EmailLoginModal = ({
  isOpen,
  onClose,
  onError,
  onLoginComplete,
}: Props) => {
  const [view, setView] = React.useState<View>('EMAIL');
  const [email, setEmail] = React.useState('');

  const viewProps = {
    email: email,
    onError,
    onChangeEmail: setEmail,
  };

  return (
    <PaperModal isOpen={isOpen} onClose={onClose}>
      {view === 'EMAIL' && (
        <EmailAddressView
          onBack={onClose}
          onNext={(view) => setView(view)}
          {...viewProps}
        />
      )}
      {view === 'CREATE' && (
        <CreateUserView
          onBack={() => setView('EMAIL')}
          onNext={onLoginComplete}
          {...viewProps}
        />
      )}
      {view === 'EXISTS' && (
        <EmailExistsView
          onBack={() => setView('EMAIL')}
          onNext={onLoginComplete}
          {...viewProps}
        />
      )}
    </PaperModal>
  );
};

export default EmailLoginModal;
