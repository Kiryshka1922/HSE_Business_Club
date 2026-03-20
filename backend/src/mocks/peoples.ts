const firstNames = [
  'Александр',
  'Екатерина',
  'Дмитрий',
  'Анна',
  'Максим',
  'Ольга',
  'Иван',
  'Татьяна',
  'Сергей',
  'Юлия',
  'Андрей',
  'Наталья',
  'Павел',
  'Елена',
  'Михаил',
];

const lastNames = [
  'Иванов',
  'Петрова',
  'Сидоров',
  'Козлова',
  'Смирнов',
  'Морозова',
  'Волков',
  'Новикова',
  'Кузнецов',
  'Попова',
  'Лебедев',
  'Соколова',
  'Зайцев',
  'Павлова',
  'Федоров',
];

const activities = [
  'IT',
  'Предпринимаю',
  'Работаю',
  'Учусь',
  'Путешествую',
  'Другое',
];
const interestsList = [
  ['программирование', 'спорт', 'музыка'],
  ['дизайн', 'фотография', 'искусство'],
  ['бизнес', 'финансы', 'нетворкинг'],
  ['наука', 'книги', 'образование'],
  ['путешествия', 'кулинария', 'йога'],
  ['маркетинг', 'реклама', 'SMM'],
  ['игры', 'кино', 'аниме'],
  ['танцы', 'вокал', 'театр'],
  ['волонтерство', 'экология', 'животные'],
  ['психология', 'коучинг', 'медитация'],
];

export const peoples = Array.from({ length: 15 }, (_, i) => ({
  first_name: firstNames[i % firstNames.length],
  last_name: lastNames[i % lastNames.length],
  age: 22 + (i % 15),
  interests: interestsList[i % interestsList.length],
  description: `Тестовый пользователь #${i + 1}. Люблю развиваться и знакомиться с новыми людьми.`,
  tg_username: `@user_${i + 1}`,
  type_activity: activities[i % activities.length],
  photo_url:
    'https://img.freepik.com/premium-psd/portrait-serious-man-with-short-hair-professional-use-transparent-background_1350623-10390.jpg?semt=ais_hybrid',
  isLiked: i % 3 === 0, // каждый третий лайкнут
}));
