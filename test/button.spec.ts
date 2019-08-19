/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { fixture, elementUpdated } from '@open-wc/testing';
import { Button } from '../lib/button/button';
import '../lib/button'; // Register <sp-button>
import { html } from 'lit-element';
import { chai } from '@bundled-es-modules/chai';
const expect = chai.expect;

chai.use(chaiDomDiff);

describe('Button', () => {
    it('loads default', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button>Button</sp-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Button');
        // make sure href is being passed to <a>
        expect(el).shadowDom.to.equal(
            `<button id="button" tabindex="0"><div id="label"><slot></slot></div></button>`
        );
    });
    it('loads with href', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button href="test_url">With Href</sp-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('With Href');
        // make sure href is being passed to <a>
        expect(el).shadowDom.to.equal(
            `<a href="test_url" id="button" tabindex="0"><div id="label"><slot></slot></div></a>`
        );
    });
    it('loads with href and target', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button href="test_url" target="_blank">
                    With Target
                </sp-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('With Target');
        // make sure href is being passed to <a>
        expect(el).shadowDom.to.equal(
            `<a href="test_url" target="_blank" id="button" tabindex="0"><div id="label"><slot></slot></div></a>`
        );
    });
});
