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
  photo_url: `https://ru.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_11139896.htm#fromView=search&page=1&position=1&uuid=74cf555d-5fd9-4a0e-ab0e-c614769f9a26&query=%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA`,
  isLiked: i % 3 === 0, // каждый третий лайкнут
}));
