import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const AppNavbar = ({ onLogout }) => {
  const { t } = useTranslation();

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="/">{t('navbar.brand')}</Navbar.Brand>
        <div className="d-flex align-items-center gap-2">
          <LanguageSwitcher />
          <Button variant="primary" onClick={onLogout}>
            {t('navbar.logout')}
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
