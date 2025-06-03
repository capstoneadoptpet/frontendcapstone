export default function getDriveImageUrl(link) {
    if (!link) return '';

    // Try extracting from /d/ID/ style
    let match = link.match(/\/d\/([^/]+)\//);
    if (match && match[1]) {
      console.log('Extracted match:', match[1]);
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=s500`;
    }

    // Try extracting from ?id=ID style
    match = link.match(/id=([^&]+)/);
    if (match && match[1]) {
      console.log('Extracted match:', match[1]);
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=s500`;
    }

    // Fallback
    return link;
}