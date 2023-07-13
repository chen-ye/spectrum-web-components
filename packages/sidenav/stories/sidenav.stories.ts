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
import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import '@spectrum-web-components/sidenav/sp-sidenav-heading.js';

export default {
    component: 'sp-sidenav',
    title: 'Sidenav',
    argTypes: {
        onChange: { action: 'change' },
    },
};

export const Default = ({
    onChange,
}: {
    onChange: () => void;
}): TemplateResult => {
    return html`
        <sp-sidenav @change=${onChange} value="Section 1">
            <sp-sidenav-item value="Section 1" label="Section 1">
                <span slot="link-text">Section 1</span>
            </sp-sidenav-item>
            <sp-sidenav-item selected value="Section 2" label="Section 2">
                <span slot="link-text">Section 2</span>
            </sp-sidenav-item>
            <sp-sidenav-heading label="CATEGORY 1">
                <sp-sidenav-item value="Section 3" label="Section 3">
                    <span slot="link-text">Section 3</span>
                </sp-sidenav-item>
                <sp-sidenav-item value="Section 4" label="Section 4">
                    <span slot="link-text">Section 4</span>
                </sp-sidenav-item>
            </sp-sidenav-heading>
        </sp-sidenav>
    `;
};

export const Multilevel = ({
    onChange,
}: {
    onChange: () => void;
}): TemplateResult => {
    return html`
        <sp-sidenav variant="multilevel" value="2.3.1" @change=${onChange}>
            <sp-sidenav-item value="foo" label="foo">
                <span slot="link-text">foo</span>
            </sp-sidenav-item>
            <sp-sidenav-item value="baz" label="baz">
                <span slot="link-text">Baz</span>
                <sp-sidenav-item value="2.1" label="2.1">
                    <span slot="link-text">2.1</span>
                </sp-sidenav-item>
                <sp-sidenav-item value="2.2" label="2.2">
                    <span slot="link-text">2.2</span>
                </sp-sidenav-item>
                <sp-sidenav-item value="2.3" label="2.3">
                    <span slot="link-text">2.3</span>
                    <sp-sidenav-item value="2.3.1" label="2.3.1">
                        <span slot="link-text">2.3.1</span>
                    </sp-sidenav-item>
                    <sp-sidenav-item disabled value="2.3.2" label="2.3.2">
                        <span slot="link-text">2.3.2</span>
                    </sp-sidenav-item>
                </sp-sidenav-item>
            </sp-sidenav-item>
            <sp-sidenav-item value="test" label="test">
                <span slot="link-text">test</span>
            </sp-sidenav-item>
            <sp-sidenav-item value="hi" label="hi">
                <span slot="link-text">hi</span>
            </sp-sidenav-item>
        </sp-sidenav>
    `;
};

Multilevel.storyName = 'Multi-level';

export const levelsAndDisabled = (): TemplateResult => {
    return html`
        <sp-sidenav>
            <sp-sidenav-heading label="CATEGORY 1">
                <sp-sidenav-item value="Section 1">
                    <span slot="link-text">Section 1</span>
                </sp-sidenav-item>
                <sp-sidenav-item value="Section 2" disabled>
                    <span slot="link-text">Section 2</span>
                </sp-sidenav-item>
                <sp-sidenav-item value="Section 3" expanded>
                    <span slot="link-text">Section 3</span>
                    <sp-sidenav-item value="Section 3a">
                        <span slot="link-text">Section 3a</span>
                    </sp-sidenav-item>
                </sp-sidenav-item>
            </sp-sidenav-heading>
        </sp-sidenav>
    `;
};

export const manageTabIndex = (): TemplateResult => {
    return html`
        <sp-sidenav manage-tab-index>
            <sp-sidenav-heading label="CATEGORY 1">
                <sp-sidenav-item value="Section 0" label="Section 0">
                    <span slot="link-text">Section 0</span>
                </sp-sidenav-item>
                <sp-sidenav-item value="Section 1" label="Section 1" selected>
                    <span slot="link-text">Section 1</span>
                </sp-sidenav-item>
                <sp-sidenav-item value="Section 2" label="Section 2" disabled>
                    <span slot="link-text">Section 2</span>
                </sp-sidenav-item>
                <sp-sidenav-item value="Section 3" label="Section 3">
                    <span slot="link-text">Section 3</span>
                    <sp-sidenav-item value="Section 3a" label="Section 3a">
                        <span slot="link-text">Section 3a</span>
                    </sp-sidenav-item>
                </sp-sidenav-item>
            </sp-sidenav-heading>
        </sp-sidenav>
    `;
};

export const Hrefs = ({
    onChange,
}: {
    onChange: () => void;
}): TemplateResult => {
    return html`
        <sp-sidenav @change=${onChange} value="current">
            <sp-sidenav-heading label="GITHUB">
                <sp-sidenav-item
                    href=${window.location.href}
                    label="Current"
                    value="current"
                    selected
                >
                    <span slot="link-text">Current</span>
                </sp-sidenav-item>
                <sp-sidenav-item
                    href="https://github.com/adobe/spectrum-web-components"
                    label="Code"
                >
                    <span slot="link-text">Code</span>
                </sp-sidenav-item>
                <sp-sidenav-item
                    href="https://github.com/adobe/spectrum-web-components/issues"
                    label="Issues"
                >
                    <span slot="link-text">Issues</span>
                </sp-sidenav-item>
                <sp-sidenav-item
                    href="https://github.com/adobe/spectrum-web-components/pulls"
                    label="Pull Requests"
                >
                    <span slot="link-text">Pull Requests</span>
                </sp-sidenav-item>
            </sp-sidenav-heading>
        </sp-sidenav>
    `;
};
