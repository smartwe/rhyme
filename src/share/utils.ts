export function isExtensionSupported(extension: string): boolean {
  extension = extension.replace('.', '');
  let isSupported = false;
  const supportedExtensions = ['mp3', 'flac'];
  for (let i = 0; i < supportedExtensions.length; i++) {
    const ext = supportedExtensions[i];

    if (isSupported) break;
    isSupported = extension === ext;
  }
  return isSupported;
}
