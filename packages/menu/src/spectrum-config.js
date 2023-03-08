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

const config = {
    spectrum: 'menu',
    components: [
        {
            name: 'menu-sectionHeading',
            host: {
                selector: '.spectrum-Menu-sectionHeading',
                shadowSelector: '.header',
            },
            exclude: [/\.spectrum-Menu(?!-sectionHeading)/],
        },
        {
            name: 'menu',
            host: {
                selector: '.spectrum-Menu',
            },
            attributes: [
                {
                    selector: '.is-selectable',
                    type: 'boolean',
                    name: 'selects',
                },
                {
                    type: 'enum',
                    name: 'size',
                    forceOntoHost: true,
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-Menu--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-Menu--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-Menu--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-Menu--sizeXL',
                        },
                    ],
                },
            ],
            slots: [
                {
                    selector: '.spectrum-Menu-item',
                    contents: 'sp-menu-item',
                },
            ],
            exclude: [
                /^\.spectrum-Menu-item/,
                /\.spectrum-Menu-item\s/,
                /\]\s\.spectrum-Menu-item/,
                /\.spectrum-Menu-divider/,
                /\.spectrum-Menu-sectionHeading/,
                /\.spectrum-Menu-checkmark/,
                /\.spectrum-Menu-chevron/,
            ],
            complexSelectors: [
                {
                    replacement: '::slotted(sp-menu)',
                    selector: /.spectrum-Menu .spectrum-Menu(?!-)/,
                },
                {
                    replacement: ':host([selects]) ::slotted(sp-menu-item)',
                    selector: '.spectrum-Menu.is-selectable',
                },
            ],
        },
        {
            name: 'menu-item',
            host: {
                selector: '.spectrum-Menu-item',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-disabled',
                    name: 'disabled',
                },
                {
                    type: 'boolean',
                    selector: '.is-active',
                    name: 'active',
                },
                {
                    type: 'boolean',
                    selector: '.is-focused',
                    name: 'focused',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-Menu-item--is-selected',
                    name: 'selected',
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Menu-itemLabel',
                    name: 'label',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-Menu-itemIcon',
                    name: 'icon',
                },
                {
                    selector: '.spectrum-Menu-chevron',
                    name: 'chevron',
                },
                {
                    selector: '.spectrum-Menu-checkmark',
                    name: 'checkmark',
                },
            ],
            slots: [
                {
                    name: 'icon',
                    selector: '.spectrum-Icon',
                },
            ],
            exclude: [
                /\.spectrum-Menu(?!-[item|itemLabel|checkmark|chevron])/,
                /\.spectrum-Menu-item .spectrum-Menu-item/,
            ],
            complexSelectors: [
                {
                    replacement: ':host([no-wrap]) #label',
                    selector: '.spectrum-Menu-itemLabel--wrapping',
                },
                {
                    replacement: ":host([dir='rtl'][focused])",
                    selector:
                        /\.spectrum-Menu-item\[dir\=rtl\]\s*.spectrum-Menu-item\.is-focused/,
                },
                {
                    replacement: ":host([dir='ltr'][focused])",
                    selector:
                        /\.spectrum-Menu-item\[dir\=ltr\]\s*.spectrum-Menu-item\.is-focused/,
                },
                {
                    replacement: ":host([dir='rtl']) .icon + #label",
                    selector:
                        /\.spectrum-Menu-item\[dir\=rtl\]\s*\.spectrum-Menu-item \.spectrum-Menu-itemIcon\s?\+\s?\.spectrum-Menu-itemLabel/,
                },
                {
                    replacement: ":host([dir='ltr']) .icon + #label",
                    selector:
                        /\.spectrum-Menu-item\[dir\=ltr\]\s*\.spectrum-Menu-item \.spectrum-Menu-itemIcon\s?\+\s?\.spectrum-Menu-itemLabel/,
                },
                {
                    replacement:
                        ':host([dir="ltr"][selected]) ::slotted(sp-menu-item[selected])',
                    selector:
                        '.spectrum-Menu.is-selectable .spectrum-Menu-item--is-selected',
                },
                {
                    replacement:
                        ':host([dir="rtl"][selects]) ::slotted(sp-menu-item[selected])',
                    selector:
                        '.spectrum-Menu.is-selectable .spectrum-Menu-item--is-selected',
                },
            ],
        },
        {
            name: 'itemLabel',
            host: {
                selector: '.spectrum-Menu-itemLabel',
                shadowSelector: '#label',
            },
            exclude: [/\.spectrum-Menu(?!-itemLabel)/, /^\[dir=/],
        },
        {
            name: 'chevron',
            host: {
                selector: '.spectrum-Menu-chevron',
                shadowSelector: '.chevron',
            },
            classes: [
                {
                    selector: '.spectrum-Menu-chevron--withAdjacentIcon',
                    name: 'chevron--withAdjacentIcon',
                },
                {
                    selector: '.spectrum-Menu-chevron--withAdjacentText',
                    name: 'chevron--withAdjacentText',
                },
            ],
            exclude: [/\.spectrum-Menu(?!-chevron)/, /^\[dir=/],
        },
        {
            name: 'checkmark',
            host: {
                selector: '.spectrum-Menu-checkmark',
                shadowSelector: '.checkmark',
            },
            classes: [
                {
                    selector: '.spectrum-Menu-checkmark--withAdjacentText',
                    name: 'checkmark--withAdjacentText',
                },
                {
                    selector: '.spectrum-Menu-checkmark--withAdjacentIcon',
                    name: 'checkmark--withAdjacentIcon',
                },
            ],
            exclude: [/\.spectrum-Menu(?!-checkmark)/, /^\[dir=/],
        },
        {
            name: 'menu-divider',
            host: {
                selector: '.spectrum-Menu',
            },
            exclude: [/\.spectrum-Menu(?!-divider)/],
            complexSelectors: [
                {
                    replacement: ':host',
                    selector: '.spectrum-Menu .spectrum-Menu-divider',
                },
                {
                    replacement: ':host',
                    selector: /^\.spectrum-Menu-divider/,
                },
            ],
        },
    ],
};

export default config;
