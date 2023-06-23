import Base from '../setup.js';

class BugFixes extends Base {
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

export default BugFixes;
