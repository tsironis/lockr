import smembers from './smembers';

export default function sismember(key: string, value: any) {
  return smembers(key).indexOf(value) > -1;
}
