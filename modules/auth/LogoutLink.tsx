import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { RxDatabase } from 'rxdb';

import Loading from 'components/Loading';
import Button from 'components/Button';
import { doLogout } from 'lib/utils';
import { deleteLocalData } from 'lib/data-utils';

interface LogoutLinkProps {
  db: RxDatabase;
}

const Container = styled.div`
  top: 8px;
  right: 8px;
  position: absolute;
`;

const LogoutLink = ({ db }: LogoutLinkProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleLogout = useCallback(async () => {
    setIsSubmitting(true);

    await deleteLocalData(db);

    doLogout();

    Swal.fire('Alright!', 'No idea who you are right now.', 'success');

    window.location.reload();
  }, [isSubmitting]);

  return (
    <Container>
      <Loading isShowing={isSubmitting} />
      <Button element="a" onClick={handleLogout} width="tiny">
        Logout
      </Button>
    </Container>
  );
};

export default LogoutLink;
