import { type MultiPartData, type H3Event } from 'h3';
import { parseFormData } from 'parse-nested-form-data';

const FILE_KEYS = ['name', 'filename', 'type', 'data'];

const isFile = (data: MultiPartData) => {
  return Object.keys(data).filter((key) => FILE_KEYS.indexOf(key) !== -1).length === FILE_KEYS.length;
};

export const useMultipartReader = async (event: H3Event) => {
  const data = await readMultipartFormData(event);
  const arr = (Array.isArray(data) ? data : []) as MultiPartData[];

  const result = arr.reduce((prev: Record<string, any>, curr) => {
    prev[String(curr.name)] = isFile(curr) ? curr : curr.data.toString('utf8');
    return prev;
  }, {});

  return parseFormData(Object.entries(result)) as Record<string, any>;
};
