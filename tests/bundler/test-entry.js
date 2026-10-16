// Minimal entry that creates a worker using the new URL() syntax.
// This validates that the bundler can handle the pattern.
const worker = new Worker(new URL('./test.worker.js', import.meta.url));
console.log('Worker created successfully');
