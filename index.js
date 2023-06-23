import BugFixes from './src/bug_fixes/index.js';

const window = unsafeWindow;

window.bugFix = new BugFixes();
window.bugFix.activate();

// setTimeout(() => {
// 	bugFix.deactivate();
// 	console.log('deactivate');
// }, 15000);

console.log('Active');
