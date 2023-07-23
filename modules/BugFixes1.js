import Base from '../src/setup.js';

class BugFixes1 extends Base {
	activate() {
		this.subscribe(GPWindowMgr.TYPE_PLAYER_SETTINGS, this.onOpenSettings);
	}

	deactivate() {
		this.unsubscribe(this.onOpenSettings);
	}

	/* Fix the position */
	onOpenSettings() {
		$('#version').css('position', 'unset');
	}
}
