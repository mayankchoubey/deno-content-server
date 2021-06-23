import {getPort, getPath}  from "./utils.ts";

export const PORT=getPort('SERVER_PORT', 5000);
export const SERVE_FILE_PATH=getPath('SERVE_FILE_PATH', Deno.args[0] || './');
export const HTTP_METHOD_GET='GET';
export const HEADER_CONTENT_TYPE='content-type';
export const HEADER_CONTENT_LENGTH='content-length';
export const CONTENT_TYPE_RAW='application/octet-stream';
export const EXTENSION_TO_CONTENT_TYPE:Record<string,string>={
    '.bin': 'application/octet-stream',
    '.csv': 'text/csv',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.gz': 'application/gzip',
    '.gif': 'image/gif',
    '.htm': 'text/html',
    '.html': 'text/html',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.mpeg': 'video/mpeg',
    '.png': 'image/png',
    '.pdf': 'application/pdf',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.rar': 'application/vnd.rar',
    '.svg': 'image/svg+xml',
    '.tar': 'application/x-tar',
    '.txt': 'text/plain',
    '.wav': 'audio/wav',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.xml': 'application/xml',
    '.zip': 'application/zip'
};