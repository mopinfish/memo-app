// deep-copy.ts
export default function deepCopy<T>(target: T): T {
  return JSON.parse(JSON.stringify(target))
}
