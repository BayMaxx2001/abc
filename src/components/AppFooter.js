import React from 'react';
import { CFooter } from '@coreui/react';

const AppFooter = () => (
  <CFooter>
    <div>
      <p>
        Copyright © 2021{' '}
        <a className="text-[blue]" href="/">
          Guubuu
        </a>
        . All rights reserved.
      </p>
    </div>
    <div className="ms-auto">
      <span className="text-bold opacity-75">Version 3.1</span>
    </div>
  </CFooter>
);

export default React.memo(AppFooter);
