'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/browse?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>▶</span>
            <span className={styles.logoText}>CineRegion</span>
          </Link>

          <nav className={styles.nav}>
            <Link
              href="/"
              className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
            >
              Главная
            </Link>
            <Link
              href="/browse"
              className={`${styles.navLink} ${pathname === '/browse' ? styles.active : ''}`}
            >
              Каталог
            </Link>
            <Link
              href="/browse?category=indie"
              className={styles.navLink}
            >
              Инди
            </Link>
            <Link
              href="/browse?category=new"
              className={styles.navLink}
            >
              Новинки
            </Link>
          </nav>
        </div>

        <div className={styles.right}>
          <div className={`${styles.searchContainer} ${searchOpen ? styles.searchOpen : ''}`}>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Поиск фильмов..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
              />
            </form>
            <button
              className={styles.searchIcon}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Поиск"
            >
              🔍
            </button>
          </div>

          <Link href="/watchlist" className={styles.iconButton} aria-label="Мой список">
            ⭐
          </Link>

          <div className={styles.profile}>
            <div className={styles.avatar}>👤</div>
          </div>
        </div>
      </div>
    </header>
  );
};
