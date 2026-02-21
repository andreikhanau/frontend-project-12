import React from 'react';
import { Navbar, Container} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';


const AppNavbar = () => {
  const { t } = useTranslation();

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="/">{t('navbar.brand')}</Navbar.Brand>
        <LanguageSwitcher />
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
