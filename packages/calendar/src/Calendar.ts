/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import {
    CalendarDate,
    getLocalTimeZone,
    getWeeksInMonth,
    isSameDay,
    startOfMonth,
    startOfWeek,
    today,
} from '@internationalized/date';
import {
    CSSResultArray,
    html,
    PropertyValueMap,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';

import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

import { CalendarWeekday, daysInWeek } from './types.js';
import styles from './calendar.css.js';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-left.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-right.js';

/**
 * @element sp-calendar
 */
export class Calendar extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    padded = false;

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ reflect: true })
    selectedDate!: Date | undefined;

    private _languageResolver = new LanguageResolutionController(this);
    private _locale!: string;
    private _timeZone: string = getLocalTimeZone();
    private _currentDate!: CalendarDate;

    public get today(): CalendarDate {
        return today(this._timeZone);
    }

    protected override willUpdate(
        changedProperties: PropertyValueMap<this>
    ): void {
        this._setLocale();
        this._setDefaultCalendarDate();

        if (changedProperties.has('selectedDate')) {
            if (this.selectedDate) {
                this.selectedDate = new Date(this.selectedDate);

                if (isNaN(this.selectedDate.getTime())) {
                    this.selectedDate = undefined;
                } else {
                    this.selectedDate.setHours(0, 0, 0, 0);
                    this._currentDate = this._toCalendarDate(this.selectedDate);
                }
            }
        }

        super.updated(changedProperties);
    }

    protected override render(): TemplateResult {
        return when(
            this._currentDate,
            () => html`
                ${this.renderCalendarHeader()}

                <div
                    class="spectrum-Calendar-body"
                    role="grid"
                    tabindex="0"
                    aria-readonly="true"
                    aria-disabled=${this.disabled}
                >
                    <table role="presentation" class="spectrum-Calendar-table">
                        <thead role="presentation">
                            <tr role="row">${this.renderWeekDays()}</tr>
                        </thead>

                        <tbody role="presentation">
                            ${this.renderWeekRows()}
                        </tbody>
                    </table>
                </div>
            `
        );
    }

    public renderCalendarHeader(): TemplateResult {
        const monthAndYear = this._capitalFirstLetter(
            this._formatDate(this._currentDate, {
                month: 'long',
                year: 'numeric',
            })
        );

        return html`
            <div class="spectrum-Calendar-header">
                <!-- TODO: Attribute 'role="heading"' removed -->
                <!-- TODO: The "heading" role requires the attribute "aria-level" -->
                <div
                    class="spectrum-Calendar-title"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    ${monthAndYear}
                </div>

                <!-- TODO: Styles applied to "disabled" buttons are overridden by spectrum-calendar.css -->

                <!-- TODO: Translate "Previous" -->
                <sp-action-button
                    quiet
                    size="s"
                    aria-label="Previous"
                    title="Previous"
                    class="spectrum-ActionButton spectrum-Calendar-prevMonth"
                    ?disabled=${this.disabled}
                >
                    <sp-icon-chevron-left slot="icon"></sp-icon-chevron-left>
                </sp-action-button>

                <!-- TODO: Translate "Next" -->
                <sp-action-button
                    quiet
                    size="s"
                    aria-label="Next"
                    title="Next"
                    class="spectrum-ActionButton spectrum-Calendar-nextMonth"
                    ?disabled=${this.disabled}
                >
                    <sp-icon-chevron-right slot="icon"></sp-icon-chevron-right>
                </sp-action-button>
            </div>
        `;
    }

    public renderWeekDays(): TemplateResult[] {
        return this._getWeekdays().map(
            (weekDay) => html`
                <th
                    role="columnheader"
                    scope="col"
                    class="spectrum-Calendar-tableCell"
                >
                    <abbr
                        class="spectrum-Calendar-dayOfWeek"
                        title=${weekDay.long}
                    >
                        ${weekDay.narrow}
                    </abbr>
                </th>
            `
        );
    }

    public renderWeekRows(): TemplateResult[] {
        return [...new Array(this._getWeeksInCurrentMonth()).keys()].map(
            (weekIndex) => html`
                <tr role="row">
                    ${this._getDatesInWeek(weekIndex).map((calendarDate) =>
                        this.renderDay(calendarDate)
                    )}
                </tr>
            `
        );
    }

    public renderDay(calendarDate: CalendarDate): TemplateResult {
        const isOutsideMonth = calendarDate.month !== this._currentDate.month;

        const isSelected = Boolean(
            this.selectedDate &&
                isSameDay(this._toCalendarDate(this.selectedDate), calendarDate)
        );

        const isToday = Boolean(isSameDay(calendarDate, this.today));

        const dayClasses = {
            'is-outsideMonth': isOutsideMonth,
            'is-selected': isSelected,
            'is-today': isToday,
            'is-disabled': this.disabled,
        };

        const currentDayTitle = this._formatDate(calendarDate, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        // TODO: Translate "Today" and "selected"
        const todayTitle = isToday ? 'Today, ' : '';
        const selectedTitle = isToday ? ' selected' : '';

        const title: string = this._capitalFirstLetter(
            `${todayTitle}${currentDayTitle}${selectedTitle}`
        );

        return html`
            <td
                role="gridcell"
                class="spectrum-Calendar-tableCell"
                title=${title}
                tabindex=${ifDefined(!isOutsideMonth ? '-1' : undefined)}
                aria-disabled=${isOutsideMonth || this.disabled}
                aria-selected=${isSelected}
            >
                <span
                    role="presentation"
                    class="spectrum-Calendar-date ${classMap(dayClasses)}"
                >
                    ${calendarDate.day}
                </span>
            </td>
        `;
    }

    private _getWeeksInCurrentMonth(): number {
        return getWeeksInMonth(this._currentDate, this._locale);
    }

    private _getWeekdays(): CalendarWeekday[] {
        const weekStart = startOfWeek(this._currentDate, this._locale);

        return [...new Array(daysInWeek).keys()].map((index) => {
            const date = weekStart.add({ days: index });

            return {
                narrow: this._formatDate(date, { weekday: 'narrow' }),
                long: this._capitalFirstLetter(
                    this._formatDate(date, { weekday: 'long' })
                ),
            };
        });
    }

    private _formatDate(
        calendarDate: CalendarDate,
        options: Intl.DateTimeFormatOptions
    ): string {
        const date = calendarDate.toDate(this._timeZone);

        return new Intl.DateTimeFormat(this._locale, options).format(date);
    }

    private _capitalFirstLetter(string: string): string {
        return `${string.charAt(0).toUpperCase()}${string.substring(1)}`;
    }

    private _setLocale(): void {
        this._locale = this._languageResolver.language;
    }

    private _setDefaultCalendarDate(): void {
        this._currentDate = this.today;
    }

    private _getDatesInWeek(weekIndex: number): CalendarDate[] {
        const dates: CalendarDate[] = [];

        let date = startOfMonth(this._currentDate).add({
            weeks: weekIndex,
        });

        date = startOfWeek(date, this._locale);

        while (dates.length < daysInWeek) {
            dates.push(date);

            const nextDate = date.add({ days: 1 });

            // If the next day is the same, we have hit the end of the calendar system
            if (isSameDay(date, nextDate)) {
                break;
            }

            date = nextDate;
        }

        return dates;
    }

    /**
     * Converts a `Date` object to a `CalendarDate`
     *
     * @param date - `Date` object
     */
    private _toCalendarDate(date: Date): CalendarDate {
        return new CalendarDate(
            date.getFullYear(),
            date.getMonth() + 1, // The month to create a new `CalendarDate` cannot be a zero-based index, unlike `Date`
            date.getDate()
        );
    }
}
