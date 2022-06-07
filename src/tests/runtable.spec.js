import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import RunTable from '../RunTable.svelte';
import LangQc from '../langQc.js';

const data = {
    'For science!': ['A1', 'B1'],
    'For hubris!': ['C1', 'D1']
};

global.fetch = jest.fn().mockImplementation(
    () => Promise.resolve({
        json: () => data
    })
);

test(
    'Page renders with example data',
    () => {
        const { getByText } = render(RunTable, {host: 'http://test.com/'});

        expect(getByText('For science!', {exact: false})).toBeInTheDocument;
        expect(getByText('For hubris!', {exact: false})).toBeInTheDocument;

        inboxMock.mockRestore();
    }
);

test(
    'Page contains an error box when web service not available',
    () => {
        const { getByText } = render(RunTable, {host: 'http://0.0.0.0'});

        expect( getByText('Filthy web error')).toBeVisible;

        expect(getByText('For science!', {exact: false})).not.toBeInTheDocument;
        expect(getByText('For hubris!', {exact: false})).not.toBeInTheDocument;
    }
)

global.fetch.mockClear();
delete global.fetch;