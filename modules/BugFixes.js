import Base from '../src/setup.js';

class BugFixes extends Base {
	activate() {
		this.subscribe(GPWindowMgr.TYPE_PLAYER_SETTINGS, this.onOpenSettings);
	}

	deactivate() {
		this.unsubscribe(this.onOpenSettings);
		let a = 1;
		let b = 2;
		let c = 3;
		let d = 4;
	}

	/* Fix the position */
	onOpenSettings() {
		$('#version').css('position', 'unset');
	}
}
