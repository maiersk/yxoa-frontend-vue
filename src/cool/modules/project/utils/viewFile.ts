import { Base64 } from 'js-base64';
import { kkviewUrl } from '/@/config/env';

export default function ViewUrl(strarr: any, fileurl: string) {
  return `${kkviewUrl}/onlinePreview?url=${encodeURIComponent(Base64.encode(fileurl))}`
}
