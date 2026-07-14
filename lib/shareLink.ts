// The API composes share_link/share_message from the backend's own base URL,
// which doesn't match the site the user is actually on (e.g. it drops the
// localhost port). Rebuild the link from the current origin instead.

const DOWNLOAD_LINK_PATTERN = /https?:\/\/\S*\/download\?ref=\S*/g;

export const buildShareLink = (referralCode: string) =>
  `${window.location.origin}/download?ref=${encodeURIComponent(referralCode)}`;

export const localizeShareMessage = (shareMessage: string, referralCode: string) => {
  const localLink = buildShareLink(referralCode);

  if (!shareMessage) {
    return localLink;
  }

  if (shareMessage.match(DOWNLOAD_LINK_PATTERN)) {
    return shareMessage.replace(DOWNLOAD_LINK_PATTERN, localLink);
  }

  return `${shareMessage} ${localLink}`;
};
