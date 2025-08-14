import DOMPurify from 'dompurify'
export const sanitize = (str) => DOMPurify.sanitize(String(str || ''))
