import { getMediaSource } from './utils/mediasource-helper';
import { ExtendedSourceBuffer } from './types/buffer';

function getSourceBuffer(): typeof self.SourceBuffer {
  return self.SourceBuffer || (self as any).WebKitSourceBuffer;
}

export function isSupported(): boolean {
  // 媒体源
  const mediaSource = getMediaSource();
  if (!mediaSource) {
    return false;
  }
  // 源缓冲区
  const sourceBuffer = getSourceBuffer();
  // 需要监测 mediaSource 的 Api 在浏览器下可用 并且需要确保支持这种视频源的格式
  // isTypeSupported 表明给定的MIME类型是否被当前的浏览器支持
  const isTypeSupported =
    mediaSource &&
    typeof mediaSource.isTypeSupported === 'function' &&
    mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

  // if SourceBuffer is exposed ensure its API is valid
  // safari and old version of Chrome doe not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible
  const sourceBufferValidAPI =
    !sourceBuffer ||
    (sourceBuffer.prototype &&
      typeof sourceBuffer.prototype.appendBuffer === 'function' &&
      typeof sourceBuffer.prototype.remove === 'function');
  return !!isTypeSupported && !!sourceBufferValidAPI;
}

export function changeTypeSupported(): boolean {
  const sourceBuffer = getSourceBuffer();
  return (
    typeof (sourceBuffer?.prototype as ExtendedSourceBuffer)?.changeType ===
    'function'
  );
}
