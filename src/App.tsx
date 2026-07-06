/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DataProvider } from './context/DataContext';
import { MainSite } from './components/MainSite';

export default function App() {
  return (
    <DataProvider>
      <MainSite />
    </DataProvider>
  );
}

