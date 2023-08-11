import Base from '@/base';

class Template extends Base {
	activate() {
		this.subscribe(GPWindowMgr.TYPE_PLAYER_SETTINGS, this.onOpenSettings);
	}

	deactivate() {
		this.unsubscribe(this.onOpenSettings);
	}

	/* Fix the position */
	onOpenSettings() {
		console.log('here');
		$('#version').css('position', 'unset');
	}
}
