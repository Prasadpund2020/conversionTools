'use client';

import React, { useState } from 'react';
import { AudioJoinerHeaderBar } from './AudioJoinerHeaderBar';
import { AudioJoinerDropzone } from './AudioJoinerDropzone';
import { AudioJoinerControls } from './AudioJoinerControls';
import { AudioJoinerStage } from './AudioJoinerStage';
import { AudioTrackItem, AudioJoinerOptions, AudioJoinerResult } from './types';
import { decodeAudioTrack, joinAudioTracks } from './audioJoinerEngine';

export const AudioJoinerTool: React.FC = () => {
  const [tracks, setTracks] = useState<AudioTrackItem[]>([]);
  const [isDecoding, setIsDecoding] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AudioJoinerResult | null>(null);

  const [options, setOptions] = useState<AudioJoinerOptions>({
    crossfadeDuration: 1,
    outputFormat: 'wav',
  });

  const handleFilesSelected = async (files: File[]) => {
    setIsDecoding(true);
    setError(null);
    setResult(null);

    try {
      const decodedTracks: AudioTrackItem[] = [];
      for (const file of files) {
        const decoded = await decodeAudioTrack(file);
        decodedTracks.push(decoded);
      }
      setTracks((prev) => [...prev, ...decodedTracks]);
    } catch (err: any) {
      console.error(err);
      setError('Unable to decode one or more audio files. Please check formats.');
    } finally {
      setIsDecoding(false);
    }
  };

  const handleReset = () => {
    if (result?.downloadUrl) {
      URL.revokeObjectURL(result.downloadUrl);
    }
    setTracks([]);
    setResult(null);
    setError(null);
    setProgressPercent(0);
    setStatusText('');
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    setTracks((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= tracks.length - 1) return;
    setTracks((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleRemoveTrack = (id: string) => {
    setTracks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOptionsChange = (newOptions: Partial<AudioJoinerOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  };

  const handleMerge = async () => {
    if (tracks.length === 0) return;

    setIsProcessing(true);
    setProgressPercent(0);
    setStatusText('Preparing track merging...');
    setError(null);

    try {
      const res = await joinAudioTracks(
        tracks,
        options,
        (progress, status) => {
          setProgressPercent(progress);
          setStatusText(status);
        }
      );
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to join audio tracks.');
    } finally {
      setIsProcessing(false);
    }
  };

  const totalDuration = tracks.reduce((sum, t) => sum + t.duration, 0);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <AudioJoinerHeaderBar
        trackCount={tracks.length}
        isProcessing={isProcessing}
        onReset={handleReset}
      />

      {tracks.length === 0 ? (
        <AudioJoinerDropzone
          onFilesSelected={handleFilesSelected}
          isDecoding={isDecoding}
          error={error}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <AudioJoinerStage
              tracks={tracks}
              result={result}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onRemoveTrack={handleRemoveTrack}
            />
          </div>
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <AudioJoinerControls
              options={options}
              totalDuration={totalDuration}
              trackCount={tracks.length}
              isProcessing={isProcessing}
              progressPercent={progressPercent}
              statusText={statusText}
              onOptionsChange={handleOptionsChange}
              onAddMoreFiles={handleFilesSelected}
              onMerge={handleMerge}
            />
          </div>
        </div>
      )}
    </div>
  );
};
