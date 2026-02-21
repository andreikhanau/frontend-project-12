import { Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || i18n.language;

  const isActive = (lang) => currentLanguage?.startsWith(lang);

  return (
    <ButtonGroup size="sm" aria-label={t('navbar.language')}>
      <Button
        variant={isActive('ru') ? 'secondary' : 'outline-secondary'}
        onClick={() => i18n.changeLanguage('ru')}
      >
        RU
      </Button>
      <Button
        variant={isActive('en') ? 'secondary' : 'outline-secondary'}
        onClick={() => i18n.changeLanguage('en')}
      >
        EN
      </Button>
    </ButtonGroup>
  );
};

export default LanguageSwitcher;
