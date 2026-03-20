const speakers = [
  { name: 'Александр Невзоров', company: 'Яндекс' },
  { name: 'Екатерина Шульман', company: 'Тинькофф' },
  { name: 'Дмитрий Гришин', company: 'Mail.ru' },
  { name: 'Татьяна Бакальчук', company: 'Wildberries' },
  { name: 'Игорь Рыбаков', company: 'Технониколь' },
  { name: 'Елена Масолова', company: 'Skyeng' },
  { name: 'Максим Спиридонов', company: 'Нетология' },
  { name: 'Оскар Хартманн', company: 'МТС' },
  { name: 'Ирина Хакамада', company: 'Сбер' },
  { name: 'Аркадий Волож', company: 'Яндекс' },
];

const titles = [
  'Как построить IT-компанию с нуля',
  'Финансовая грамотность для предпринимателей',
  'Тренды маркетинга 2026',
  'Искусственный интеллект в бизнесе',
  'Управление командой: от А до Я',
  'EdTech: будущее образования',
  'Стартапы: как привлечь инвестиции',
  'Продуктовый подход в разработке',
  'Личный бренд руководителя',
  'Цифровая трансформация бизнеса',
];

const places = [
  'Зал А',
  'Зал Б',
  'Зал В',
  'Зал Г',
  'Зал Д',
  'Конференц-зал 1',
  'Конференц-зал 2',
  'Амфитеатр',
  'Лекторий',
  'Мастерская',
];

// События каждый час с 10:00 до 19:00
export const events = Array.from({ length: 10 }, (_, i) => {
  const startHour = 10 + (i % 5);
  const speaker = speakers[i % speakers.length];

  return {
    start_time: `${startHour.toString().padStart(2, '0')}:00`,
    end_time: `${(startHour + 1).toString().padStart(2, '0')}:00`,
    speaker_name: speaker.name,
    company_name: speaker.company,
    title: titles[i % titles.length],
    place: places[i % places.length],
    isLiked: i % 5 === 0, // каждый второй лайкнут
    photo_url:
      'https://img.freepik.com/premium-psd/portrait-serious-man-with-short-hair-professional-use-transparent-background_1350623-10390.jpg?semt=ais_hybrid',
  };
});
