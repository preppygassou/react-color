/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
import React, { useRef, useMemo, useEffect } from 'react';

import { useEventCallback } from '../../hooks/useEventCallback';
import { clamp } from '../../utils/clamp';

// Check if an event was triggered by touch
const isTouch = (event) => 'touches' in event;

// Finds a proper touch point by its identifier
const getTouchPoint = (touches, touchId) => {
	for (let i = 0; i < touches.length; i++) {
		if (touches[i].identifier === touchId) return touches[i];
	}
	return touches[0];
};

// Finds the proper window object to fix iframe embedding issues
const getParentWindow = (node) =>
	(node && node.ownerDocument.defaultView) || self;

/*   const getParentWindow = (node) =>
  (node && node.ownerDocument.defaultView) || (typeof window !== "undefined" ? window : global);
 */

// Returns a relative position of the pointer inside the node's bounding box
const getRelativePosition = (node, event, touchId) => {
	const rect = node.getBoundingClientRect();

	// Get user's pointer position from `touches` array if it's a `TouchEvent`
	const pointer = isTouch(event)
		? getTouchPoint(event.touches, touchId)
		: event;

	return {
		left: clamp(
			(pointer.pageX - (rect.left + getParentWindow(node).pageXOffset)) /
				rect.width
		),
		top: clamp(
			(pointer.pageY - (rect.top + getParentWindow(node).pageYOffset)) /
				rect.height
		)
	};
};

// Browsers introduced an intervention, making touch events passive by default.
// This workaround removes `preventDefault` call from the touch handlers.
// https://github.com/facebook/react/issues/19651
/* const preventDefaultMove = (event) => {
	!isTouch(event) && event.preventDefault();
}; */

const preventDefaultMove = (event) => {
	if (!isTouch(event)) {
		event.preventDefault();
	}
};

// Prevent mobile browsers from handling mouse events (conflicting with touch ones).
// If we detected a touch interaction before, we prefer reacting to touch events only.
const isInvalid = (event, hasTouch) => hasTouch && !isTouch(event);

function InteractiveBase({ onMove, onKey, ...rest }) {
	const container = useRef(null);
	const onMoveCallback = useEventCallback(onMove);
	const onKeyCallback = useEventCallback(onKey);

	//	const touchId = (useRef < null) | (number > null);

	const touchId = useRef(null);

	const hasTouch = useRef(false);

	const [handleMoveStart, handleKeyDown, toggleDocumentEvents] = useMemo(() => {
		const handleMoveStart = ({ nativeEvent }) => {
			const el = container.current;
			if (!el) return;

			// Prevent text selection
			preventDefaultMove(nativeEvent);

			if (isInvalid(nativeEvent, hasTouch.current) || !el) return;

			if (isTouch(nativeEvent)) {
				hasTouch.current = true;
				const changedTouches = nativeEvent.changedTouches || [];
				if (changedTouches.length)
					touchId.current = changedTouches[0].identifier;
			}

			el.focus();
			onMoveCallback(getRelativePosition(el, nativeEvent, touchId.current));
			toggleDocumentEvents(true);
		};

		const handleMove = (event) => {
			// Prevent text selection
			preventDefaultMove(event);

			// If user moves the pointer outside of the window or iframe bounds and release it there,
			// `mouseup`/`touchend` won't be fired. In order to stop the picker from following the cursor
			// after the user has moved the mouse/finger back to the document, we check `event.buttons`
			// and `event.touches`. It allows us to detect that the user is just moving his pointer
			// without pressing it down
			const isDown = isTouch(event)
				? event.touches.length > 0
				: event.buttons > 0;

			if (isDown && container.current) {
				onMoveCallback(
					getRelativePosition(container.current, event, touchId.current)
				);
			} else {
				toggleDocumentEvents(false);
			}
		};

		const handleMoveEnd = () => toggleDocumentEvents(false);

		// eslint-disable-next-line no-shadow
		const handleKeyDown = (event) => {
			const keyCode = event.which || event.keyCode;

			// Ignore all keys except arrow ones
			if (keyCode < 37 || keyCode > 40) return;
			// Do not scroll page by arrow keys when document is focused on the element
			event.preventDefault();
			// Send relative offset to the parent component.
			// We use codes (37←, 38↑, 39→, 40↓) instead of keys ('ArrowRight', 'ArrowDown', etc)
			// to reduce the size of the library
			onKeyCallback({
				left: keyCode === 39 ? 0.05 : keyCode === 37 ? -0.05 : 0,
				top: keyCode === 40 ? 0.05 : keyCode === 38 ? -0.05 : 0
			});
		};

		function toggleDocumentEvents(state) {
			const touch = hasTouch.current;
			const el = container.current;
			const parentWindow = getParentWindow(el);

			// Add or remove additional pointer event listeners
			const toggleEvent = state
				? parentWindow.addEventListener
				: parentWindow.removeEventListener;
			toggleEvent(touch ? 'touchmove' : 'mousemove', handleMove);
			toggleEvent(touch ? 'touchend' : 'mouseup', handleMoveEnd);
		}

		return [handleMoveStart, handleKeyDown, toggleDocumentEvents];
	}, [onKeyCallback, onMoveCallback]);

	// Remove window event listeners before unmounting
	useEffect(() => toggleDocumentEvents, [toggleDocumentEvents]);

	return (
		<div
			{...rest}
			onTouchStart={handleMoveStart}
			onMouseDown={handleMoveStart}
			className="react-colorful__interactive"
			ref={container}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			role="slider"
		/>
	);
}

export const Interactive = React.memo(InteractiveBase);
