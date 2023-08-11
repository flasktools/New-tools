class Base {
	/* Subscribe to the window open event */
	async subscribe(type, fnt) {
		while (typeof uw.$ === 'undefined') {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}

		uw.$.Observer(GameEvents.window.open).subscribe(fnt.name, (event, data) => {
			if (data?.wnd?.type === type) {
				setTimeout(() => fnt(data.wnd), 50);
			}
		});
	}

	/* Unsubscribe the function*/
	unsubscribe(fnt) {
		$.Observer(GameEvents.window.open).unsubscribe(fnt.name);
	}
}

export default Base;
