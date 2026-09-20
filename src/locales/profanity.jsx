import leoProfanity from 'leo-profanity';

leoProfanity.loadDictionary('en');
leoProfanity.add(leoProfanity.getDictionary('ru'));

export default leoProfanity;