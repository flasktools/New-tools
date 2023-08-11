import Base from '@/base';
import GPWindowMgr from '@/GPWindowMgr';

class Test extends Base {
	activate() {
		this.subscribe(GPWindowMgr.TYPE_ISLAND, this.main);
	}

	deactivate() {
		this.unsubscribe(this.main);
	}

	/* Fix the position */
	main() {
		const message = $('<grepo-icon/>', {
			id: 'myElementId',
			type: 'message',
		});

		// message.click();
		message.mousePopup(new MousePopup('Message'));

		message.css({
			position: 'absolute',
			right: '0px',
			top: 26,
		});

		$('#island_towns_controls').append(message);

		const island = $('<grepo-icon/>', {
			id: 'myElementId',
			type: 'island',
		});

		island.mousePopup(new MousePopup('Island'));

		island.css({
			position: 'absolute',
			right: '35px',
			top: 26,
		});

		$('#island_towns_controls').append(island);
	}
}
