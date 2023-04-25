/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import {
    firstFocusableIn,
    firstFocusableSlottedIn,
} from '@spectrum-web-components/shared/src/first-focusable-in.js';
import { ReactiveElement } from 'lit';
import {
    BeforetoggleClosedEvent,
    BeforetoggleOpenEvent,
    guaranteedTransitionend,
    OpenableElement,
    OverlayBase,
} from './OverlayBase.js';
import { VirtualTrigger } from './VirtualTrigger.js';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

function nextFrame(): Promise<void> {
    return new Promise((res) => requestAnimationFrame(() => res()));
}

export function OverlayNoPopover<T extends Constructor<OverlayBase>>(
    constructor: T
): T & Constructor<ReactiveElement> {
    class OverlayWithNoPopover extends constructor {
        protected override async managePopoverOpen(): Promise<void> {
            const targetOpenState = this.open;
            await this.managePosition();
            await this.ensureOnDOM();
            const focusEl = await this.makeTransition(targetOpenState);
            await this.applyFocus(targetOpenState, focusEl);
        }

        private async ensureOnDOM(): Promise<void> {
            await nextFrame();
            await nextFrame();
        }

        private async makeTransition(
            targetOpenState: boolean
        ): Promise<HTMLElement | null> {
            let focusEl = null as HTMLElement | null;
            const start = (el: OpenableElement, index: number) => (): void => {
                if (targetOpenState !== this.open) {
                    return;
                }
                if (typeof el.open !== 'undefined') {
                    el.open = targetOpenState;
                }
                if (index === 0) {
                    const event = targetOpenState
                        ? BeforetoggleOpenEvent
                        : BeforetoggleClosedEvent;
                    this.dispatchEvent(new event());
                }
                if (targetOpenState !== true) {
                    return;
                }
                focusEl = focusEl || firstFocusableIn(el);
                if (focusEl) {
                    return;
                }
                const childSlots = el.querySelectorAll('slot');
                childSlots.forEach((slot) => {
                    if (!focusEl) {
                        focusEl = firstFocusableSlottedIn(slot);
                    }
                });
            };
            const finish = (el: OpenableElement, index: number) => (): void => {
                if (this.open !== targetOpenState) {
                    return;
                }
                const eventName = targetOpenState ? 'sp-opened' : 'sp-closed';
                el.dispatchEvent(
                    new Event(eventName, {
                        bubbles: false,
                        composed: false,
                    })
                );
                if (index > 0) {
                    return;
                }
                const hasVirtualTrigger =
                    this.triggerElement instanceof VirtualTrigger;
                this.dispatchEvent(
                    new Event(eventName, {
                        bubbles: hasVirtualTrigger,
                        composed: hasVirtualTrigger,
                    })
                );
                if (this.triggerElement && !hasVirtualTrigger) {
                    (this.triggerElement as HTMLElement).dispatchEvent(
                        new CustomEvent(eventName, {
                            bubbles: true,
                            composed: true,
                            detail: { interaction: this.type },
                        })
                    );
                }
            };
            this.elements.forEach((el, index) => {
                guaranteedTransitionend(
                    el,
                    start(el, index),
                    finish(el, index)
                );
            });
            return focusEl;
        }

        private async applyFocus(
            targetOpenState: boolean,
            focusEl: HTMLElement | null
        ): Promise<void> {
            if (this.receivesFocus === 'false') {
                return;
            }

            await nextFrame();
            await nextFrame();
            if (targetOpenState === this.open && !this.open) {
                if (
                    // Do not return focus to trigger when overlay is a "hint" (tooltip)
                    this.type !== 'hint' &&
                    // Only return focus when the trigger is not "virtual"
                    this.triggerElement &&
                    !(this.triggerElement instanceof VirtualTrigger)
                ) {
                    // This has a bug where the current overlay and the focused content could share the same `activeElement` shadow root...
                    const relationEvent = new Event('overlay-relation-query', {
                        bubbles: true,
                        composed: true,
                    });
                    this.addEventListener(
                        relationEvent.type,
                        (event: Event) => {
                            /* eslint-disable @spectrum-web-components/document-active-element */
                            if (
                                document.activeElement &&
                                event
                                    .composedPath()
                                    .includes(document.activeElement)
                            ) {
                                (this.triggerElement as HTMLElement).focus();
                            }
                            /* eslint-enable @spectrum-web-components/document-active-element */
                        }
                    );
                    this.dispatchEvent(relationEvent);
                }
                return;
            }

            focusEl?.focus();
        }
    }
    return OverlayWithNoPopover;
}
