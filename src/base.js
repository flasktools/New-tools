class Base {
	/* Subscribe to the window open event */
	subscribe(type, fnt) {
		$.Observer(GameEvents.window.open).subscribe(fnt.name, (event, data) => {
			if (!data.wnd) return;
			if (data.wnd.type !== type) return;
			fnt(data.wnd);
		});
	}

	/* Unsubscribe the function*/
	unsubscribe(fnt) {
		$.Observer(GameEvents.window.open).unsubscribe(fnt.name);
	}
}

export default Base;
