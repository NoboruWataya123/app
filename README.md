# 🎬 CineRegion - Региональный Стриминговый Сервис

Современный видео-стриминговый сервис для региональных и инди-фильмов, созданный с использованием Next.js 16, CSS Modules и Zustand.

## ✨ Особенности

- 🎨 **Современный UI/UX** - Минималистичный дизайн в стиле Netflix
- 📱 **Полностью адаптивный** - Работает на всех устройствах
- ⚡ **Next.js 16** - Server Components, App Router
- 🎭 **CSS Modules** - Модульная изолированная стилизация
- 🗃️ **Zustand** - Легковесное управление состоянием
- 🎥 **Видео плеер** - Кастомный плеер с прогрессом просмотра
- ⭐ **Watchlist** - Персональный список фильмов
- 🔍 **Поиск** - Быстрый поиск по фильмам
- 🎯 **Фильтры** - Фильтрация по жанрам

## 🏗️ Архитектура

Проект построен с упором на модульность и расширяемость:

```
src/
├── app/                    # Next.js App Router pages
│   ├── browse/            # Страница каталога
│   ├── movies/[id]/       # Страница деталей фильма
│   ├── watch/[id]/        # Страница просмотра
│   └── watchlist/         # Личный список
├── components/            # React компоненты
│   ├── layout/           # Layout компоненты (Header)
│   ├── movie/            # Movie компоненты (Card, Row, Hero)
│   ├── player/           # Video player
│   └── ui/               # UI компоненты (Button, Loading)
├── store/                # Zustand stores
│   ├── useMovieStore.ts  # Состояние фильмов
│   └── useUserStore.ts   # Пользовательские данные
├── lib/                  # Утилиты и API
│   ├── api/             # Mock API
│   ├── data/            # Mock данные
│   └── utils/           # Вспомогательные функции
└── types/               # TypeScript типы
```

## 🚀 Быстрый старт

### Установка

```bash
npm install
```

### Запуск dev сервера

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Сборка для production

```bash
npm run build
npm start
```

## 🛠️ Технологии

- **Frontend**: Next.js 16, React 19, TypeScript
- **Стилизация**: CSS Modules
- **Состояние**: Zustand
- **Изображения**: Next/Image с оптимизацией
- **Шрифты**: Inter (Google Fonts)

## 📦 Компоненты

### Layout

- **Header** - Навигация, поиск, профиль

### Movie

- **Hero** - Большой баннер на главной
- **MovieCard** - Карточка фильма
- **MovieRow** - Горизонтальный ряд фильмов

### Player

- **VideoPlayer** - Кастомный видео плеер с контролами

### UI

- **Button** - Переиспользуемая кнопка
- **Loading** - Индикатор загрузки

## 🎨 Дизайн системы

### Цветовая палитра

- Primary: `#667eea` → `#764ba2` (градиент)
- Background: `#0a0a0f`
- Surface: `#1a1a24`
- Text: `#ffffff`

### Отступы и размеры

- Container max-width: `1400px`
- Padding: `40px` (desktop), `20px` (mobile)
- Border radius: `6px`, `12px`

## 📝 API (Mock)

Backend в данный момент моковый. Все данные находятся в `src/lib/data/movies.ts`.

### Доступные методы:

```typescript
moviesApi.getCategories()
moviesApi.getFeaturedMovies()
moviesApi.getMovieById(id)
moviesApi.searchMovies(query)
moviesApi.getMoviesByGenre(genre)
moviesApi.getSimilarMovies(movieId)
moviesApi.getAllMovies()
```

## 🔄 Состояние (Zustand)

### Movie Store

Управление каталогом фильмов, поиском, текущим фильмом.

### User Store

Управление watchlist и прогрессом просмотра (с персистентностью в localStorage).

## 🚧 Roadmap

- [ ] Интеграция с реальным backend
- [ ] Аутентификация пользователей
- [ ] Комментарии и рейтинги
- [ ] Рекомендации на основе ML
- [ ] Субтитры и множественные языки
- [ ] Offline режим (PWA)

## 📄 Лицензия

MIT

## 👨‍💻 Автор

Создано с использованием Next.js 16 и лучших практик разработки.
