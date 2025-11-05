'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  movieId: string;
  movieTitle: string;
  videoUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  movieId,
  movieTitle,
  videoUrl,
}) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { updateProgress } = useUserStore();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  // Save progress periodically
  useEffect(() => {
    if (isPlaying && duration > 0) {
      progressIntervalRef.current = setInterval(() => {
        const progress = (currentTime / duration) * 100;
        updateProgress(movieId, progress);
      }, 10000); // Update every 10 seconds
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, currentTime, duration, movieId, updateProgress]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleBack = () => {
    const progress = (currentTime / duration) * 100;
    updateProgress(movieId, progress);
    router.back();
  };

  return (
    <div
      className={styles.playerContainer}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className={styles.video}
        onClick={togglePlay}
        poster="/placeholder-video.jpg"
      >
        <source src={videoUrl} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      {/* Mock video placeholder - since we don't have actual videos */}
      <div className={styles.mockVideo}>
        <div className={styles.mockContent}>
          <h2>🎬 {movieTitle}</h2>
          <p>Mock видео плеер</p>
          <p className={styles.mockNote}>
            (В production здесь будет настоящее видео)
          </p>
        </div>
      </div>

      <div
        className={`${styles.controls} ${showControls ? styles.visible : ''}`}
      >
        <button className={styles.backButton} onClick={handleBack}>
          ← Назад
        </button>

        <div className={styles.progressBar}>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className={styles.progressSlider}
          />
        </div>

        <div className={styles.controlsBottom}>
          <div className={styles.leftControls}>
            <button className={styles.controlBtn} onClick={togglePlay}>
              {isPlaying ? '⏸' : '▶'}
            </button>

            <div className={styles.volumeControl}>
              <button className={styles.controlBtn} onClick={toggleMute}>
                {isMuted || volume === 0 ? '🔇' : '🔊'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
              />
            </div>

            <span className={styles.time}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className={styles.rightControls}>
            <button className={styles.controlBtn} onClick={toggleFullscreen}>
              {isFullscreen ? '⛶' : '⛶'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
